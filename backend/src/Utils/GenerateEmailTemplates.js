"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailContent = generateEmailContent;
exports.generateNewAccNotificationContent = generateNewAccNotificationContent;
const mjml_1 = __importDefault(require("mjml"));
function generateEmailContent(userName) {
    const mjmlTemplate = `
    <mjml>
  <mj-head>
    <mj-preview>A nossa plataforma mudou de endereço!</mj-preview>
    <mj-title>FlixNext - Mudança de Endereço</mj-title>
  </mj-head>
  <mj-body background-color="#121212">
    <mj-section background-color="#1f1f1f" padding="20px">
      <mj-column>
        <mj-text align="center" font-size="34px" color="#ffffff" font-family="Arial, sans-serif">
          A nossa plataforma mudou de endereço!
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section background-color="#101010" border-radius="8px" padding="20px" css-class="box-shadow">
      <mj-column>
        <mj-text font-size="24px" color="#ffffff" font-family="Arial, sans-serif" font-weight="700" >
          Olá, <strong>${userName}</strong>!
        </mj-text>
        <mj-text font-size="20px" color="#d3d3d3" font-family="Arial, sans-serif" line-height="1.5" >
          Buscando melhorar a performance da plataforma, passamos por um processo de mudança de hospedagem e nosso site mudou.
        </mj-text>
        <mj-text font-size="20px" color="#ffffff" font-family="Arial, sans-serif">
          Nosso novo link de acesso:
        </mj-text>
        <mj-button href="https://flixnext.netlify.app" background-color="#f44336" color="#ffffff" font-size="18px" font-weight="700" padding="15px 30px">
          flixnext.netlify.app
        </mj-button>
        <mj-text font-size="20px" color="#d3d3d3" font-family="Arial, sans-serif" >
          Lembrando que esse é um link temporário. Em breve revelaremos o definitivo.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="20px">
      <mj-column>
        <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          <strong>Contribua para o nosso trabalho, faça uma doação para o nosso site.</strong> Acesse a página de doações da nossa plataforma para mais informações: 
          <a href="https://flixnext.netlify.app/donate" style="color: #ffffff; text-decoration: none; font-weight: 700;">página de doação</a>
        </mj-text>
        <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar. 
          Se você não quiser mais receber nossos emails, modifique as configurações da sua conta
          <a href="https://flixnext.vercel.app/me" target="_blank" style="color: #f44336; text-decoration: none;">aqui</a>.
        </mj-text>
        <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          Este e-mail foi enviado de uma conta que apenas envia notificações e não pode receber respostas. Por favor não responda.
        </mj-text>
        <mj-text align="center" font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          ©2025 FlixNext
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
    const { html, errors } = (0, mjml_1.default)(mjmlTemplate);
    if (errors.length > 0) {
        console.error("Erro ao compilar o template MJML:", errors);
        throw new Error("Erro ao gerar o template de email.");
    }
    return html;
}
function generateNewAccNotificationContent({ name, email, birthday, password }) {
    const mjmlTemplate = `
    <mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
      <mj-text color="#ffffff" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#121212">
    <mj-section>
      <mj-column>
        <!-- Header -->
        <mj-text align="center" font-size="34px" color="#ffffff" padding="20px" background-color="#000000">
          Uma nova conta foi criada!
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <!-- Text Content -->
        <mj-text align="center" font-size="26px" line-height="1.5" padding="20px">
          Nome: ${name}
        </mj-text>
        <mj-text align="center" font-size="26px" line-height="1.5" padding="0px">
          Email: ${email}
        </mj-text>
        <mj-text align="center" font-size="26px" line-height="1.5" padding="0px">
          Birthday: ${birthday}
        </mj-text>
        <mj-text align="center" font-size="26px" line-height="1.5" padding="0px">
          Senha: ${password}
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <!-- Footer -->
        <mj-text align="center" font-size="12px" color="#cccccc" padding="20px">
          ©2024 FlixNext
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>

`;
    const { html, errors } = (0, mjml_1.default)(mjmlTemplate);
    if (errors.length > 0) {
        console.error("Erro ao compilar o template MJML:", errors);
        throw new Error("Erro ao gerar o template de email.");
    }
    return html;
}
