# slate

## Development

### Running locally
```sh
bun install
bun dev
```


## Docs 
> This will be replaced by dedicated documentation later.


### How to setup `ollama` locally 
- Setup `ollama` following the documentation on https://ollama.com/download
- Choose any model or models from `https://ollama.com/search` that you wanna run and pull them using `ollama pull <MODEL_NAME>`
- Run one of the following commands to start `ollama` locally
  - For unix systems `OLLAMA_ORIGINS=https://slatechat.vercel.app ollama serve`
  - For powershell `$env:OLLAMA_ORIGINS="https://slatechat.vercel.app"; ollama serve`
- Go to https://slatechat.vercel.app/chat and start a new local chat, you should see your models listed in the dropdown

![image](https://github.com/user-attachments/assets/9155eda5-88e2-4ad1-8e87-2474709b3e42)

> If you're using the Brave browser or any other ad blockers, don't forget to disable the ad blocking or it won't work.
