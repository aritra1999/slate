# slate
One UI for hosting communicating to all LLMs. Our UI, your LLM. 
- No more complex docker setups to communicate to ollama running locally or remotely. 
- Bring your own API tokens and pay for what you use
- Completely free to use.
- Everything's stored locally. 

## Development

### Running locally

```sh
bun install
bun dev
```

## Roadmap / Feature Set
- [ ] Chat
  - [x] Basic text chat - https://github.com/aritra1999/slate/pull/18
  - [x] Rendering response as markdown - https://github.com/aritra1999/slate/pull/20
  - [ ] File upload for additional context
- [ ] Support for local models
  - [x] With Ollama - https://github.com/aritra1999/slate/pull/15
  - [ ] With LM Studio
  - [ ] Custom config
- [ ] Support for third-party models using API keys
  - [ ] OpenAI
  - [ ] Anthropic
  - [ ] Geminai
  - [ ] Deepseek
- [ ] Support for self-hosted models
  - [ ] With Ollama
  - [ ] With LM Studio
  - [ ] Custom config
- [ ] Documentation

## Docs
> This will be replaced by dedicated documentation later.

### How to setup `ollama` locally
- Setup `ollama` following the documentation on https://ollama.com/download
- Choose any model or models from https://ollama.com/search that you wanna run and pull them using `ollama pull <MODEL_NAME>`
- Run one of the following commands to start `ollama` locally
  - For unix systems `OLLAMA_ORIGINS=https://slatechat.vercel.app ollama serve`
  - For powershell `$env:OLLAMA_ORIGINS="https://slatechat.vercel.app"; ollama serve`
- Go to https://slatechat.vercel.app/chat and start a new local chat, you should see your models listed in the dropdown

![image](https://github.com/user-attachments/assets/9155eda5-88e2-4ad1-8e87-2474709b3e42)

> If you're using the Brave browser or any other ad blockers, don't forget to disable the ad blocking or it won't work.
