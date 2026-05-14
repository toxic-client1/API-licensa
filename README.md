# Toxic Client License API

Este é o sistema de backend para gerenciar as licenças do seu client.

## Como configurar

1. Instale o Node.js no seu servidor/computador.
2. Abra o terminal na pasta `license-api`.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor rodará por padrão na porta 3000.

## Como gerar licenças

Para gerar novas chaves de licença, use o script `generate.js`:
```bash
# Gera 1 licença
node generate.js

# Gera 10 licenças
node generate.js 10
```
As chaves serão exibidas no terminal e salvas no arquivo `licenses.json`.

## Integração com o Client

No arquivo `LicenseManager.java` do seu client, altere a variável `API_URL` para o endereço do seu servidor:
```java
private static final String API_URL = "http://seu-dominio.com/validate";
```

## Como funciona
- As chaves seguem o formato: `TOXIC-XXXXX-XXXXX`.
- Quando um usuário usa a chave pela primeira vez, ela fica vinculada ao **HWID** (identificação do hardware) dele.
- Se outra pessoa tentar usar a mesma chave, o servidor negará o acesso.
- Se você deletar uma chave do `licenses.json` ou mudar o status dela, o client parará de funcionar para aquele usuário.
