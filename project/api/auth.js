import cors from 'cors';
import { OAuth2Client } from 'google-auth-library';

// Helper para rodar o middleware do CORS em um ambiente serverless
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Inicializa o cliente do Google com o ID do seu app
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);

// Handler da função serverless que será o nosso endpoint de API
export default async function handler(req, res) {
  // Configura o CORS para permitir requisições apenas do seu site
  // Isso é crucial para a segurança!
  const corsMiddleware = cors({
    origin: process.env.VITE_APP_URL,
  });
  
  // Executa o middleware
  await runMiddleware(req, res, corsMiddleware);

  // Garante que a requisição é do tipo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas o método POST é permitido' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'Token não fornecido' });
  }

  try {
    // Verifica o token com os servidores do Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    console.log(`Usuário ${payload.email} verificado com sucesso no backend.`);
    
    // AQUI é onde, no futuro, você vai interagir com um banco de dados
    // para salvar ou carregar os dados do usuário (ex: progressos, etc.)

    // Retorna os dados do usuário para o frontend
    res.status(200).json({ 
      message: "Login bem-sucedido!", 
      user: { 
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture 
      }
    });

  } catch (error) {
    console.error("Erro no backend ao verificar o token:", error);
    res.status(401).json({ message: "Falha na autenticação: Token inválido ou expirado." });
  }
}