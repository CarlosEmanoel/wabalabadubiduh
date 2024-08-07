import util from "../../../services/util";

const year = util.getCurrentYear();

export const mailTemplate = ({ title, saudation, content, signature, href }) => `<html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
            <tr>
                <td align="center" bgcolor="#007FC5" style="padding: 40px 0;">
                    <h1 style="color: #ffffff; margin: 0;">${title}</h1>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                    <h2 style="color: #333333;">${saudation}</h2>
                    <p style="color: #666666; line-height: 1.6;">
                        ${content}
                    </p>
                    <p style="color: #666666; line-height: 1.6;">${signature}</p> 
                </td>
            </tr>

            <tr>
                <td bgcolor="#007FC5" style="padding: 20px 30px 20px 30px;">
                    <div style="display: flex; justify-content: center; align-items: center; padding-bottom: 10px;">
                        <a href="https://www.facebook.com/performancegoiania" target="_blank" style="color: #ffffff;">
                            Facebook
                        </a>
                        <a href="https://www.instagram.com/performancegoiania" target="_blank" style="color: #ffffff; margin-left: 20px; margin-right: 20px;">
                            Instagram
                        </a>
                        <a href="https://api.whatsapp.com/send/?phone=5562999428364&text&type=phone_number&app_absent=0" target="_blank" style="color: #ffffff;">
                            Whatsapp
                        </a>
                    </div>
                    <p style="color: #ffffff; text-align: center; margin: 10px;">&copy; ${year}, <a href="https://performance.goiania.br/" style="color: #ffffff;">Performance Goiânia™</a>.<br>Todos
                        os direitos reservados.</p>
                </td>
            </tr>
        </table>
    </body>
</html>`;

{/*
<Link to="https://www.facebook.com/performancegoiania" target="_blank" style="color: #ffffff; padding: 10px; background-color: #ffffff; border-radius: 100%;">
    <img src="https://expansaodigital.tec.br/performance.api/files/ic_social_facebook_filled"/>
</Link>
<Link to="https://www.instagram.com/performancegoiania" target="_blank" style="color: #ffffff; padding: 10px; background-color: #ffffff; border-radius: 100%; margin-left: 20px; margin-right: 20px;">
    <img src="https://expansaodigital.tec.br/performance.api/files/ic_social_instagram_filled"/>
</Link>
<Link to="https://api.whatsapp.com/send/?phone=5562999428364&text&type=phone_number&app_absent=0" target="_blank" style="color: #ffffff; padding: 10px; background-color: #ffffff; border-radius: 100%;">
    <img src="https://expansaodigital.tec.br/performance.api/files/ic_social_whatsapp_filled"/>
</Link>
*/}