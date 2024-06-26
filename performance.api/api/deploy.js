import { exec } from 'child_process';

export const deploy = async (ctx) => {
  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec('/home/deploy_performance.sh', (error, stdout, stderr) => {
        if (error) {
          if (error.code === 'ETIMEDOUT') {
            console.warn('O script demorou muito para responder e foi interrompido por timeout.');
            resolve({ stdout: 'Execução interrompida por timeout', stderr: '' });
          } else {
            reject(error);
          }
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    if (stderr) {
      console.error('Erro durante a execução do script:', stderr);
      ctx.status = 500;
      ctx.body = 'Erro durante a execução do script';
    } else {
      console.log('Saída do script:', stdout);
      ctx.body = stdout;
    }
  } catch (error) {
    if (error.code !== 'ETIMEDOUT') {
      console.error('Erro ao executar o deploy:', error);
      ctx.status = 500;
      ctx.body = 'Erro ao executar o deploy : ' + error.message;
    } else {
      console.warn('Erro de timeout, tente novamente.');
      ctx.status = 200;
      ctx.body = 'Execução interrompida por timeout';
    }
  }
};

/* FUNCIONAL */
/* import { spawn } from 'child_process';

export const deploy = (ctx) => {
  const process = spawn('/home/deploy_performance.sh', { detached: true });

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    ctx.status = 500;
    ctx.body = 'Erro durante a execução do script';
  });

  process.on('error', (error) => {
    console.error('Erro ao executar o deploy:', error);
    ctx.status = 500;
    ctx.body = 'Erro ao executar o deploy: ' + error.message;
  });

  process.on('close', (code) => {
    console.log(`Processo de deploy finalizado com código ${code}`);
    if (code === 0) {
      ctx.body = 'Deploy realizado com sucesso';
    } else {
      ctx.status = 500;
      ctx.body = 'Deploy falhou';
    }
  });
}; */




/* PADRÃO */
/* import { exec } from 'child_process';

export const deploy = async (ctx) => {
  try {
    const { stdout, stderr } = await new Promise((resolve, reject) => {
      exec('/home/deploy_performance.sh', (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });

    if (stderr) {
      console.error('Erro durante a execução do script:', stderr);
      ctx.status = 500;
      ctx.body = 'Erro durante a execução do script';
    } else {
      console.log('Saída do script:', stdout);
      ctx.body = stdout;
    }
  } catch (error) {
    console.error('Erro ao executar o deploy:', error);
    ctx.status = 500;
    ctx.body = 'Erro ao executar o deploy : ' + error.message;
  }
}; */