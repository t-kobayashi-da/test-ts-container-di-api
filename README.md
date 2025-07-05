# test-ts-container-di-api
TypeScript・DI・コンテナ構成の学習用API

# 💡 最終ゴール
TypeScript + Express によるWeb APIコンテナをDev Containerで構築し、以下を実現
- ✅ /file にGETアクセス → 「hello world!」のテキストファイル返却
- ✅ 依存性注入(DI)設計、service/repository/router/controller 分離
- ✅ ユニットテスト付き
- ✅ ログ出力あり
- ✅ npm ci クリーンインストール
- ✅ devcontainer 導入
- ✅ GitHub管理を前提に、ファイル構成を具体例提示

# 🛠 ステップ全体像
1. プロジェクト雛形作成（TypeScript + Node.js）
2. 必要パッケージ導入
3. ファイル構造整備（DI設計）
4. 各層のコード実装
5. ユニットテスト追加
6. devcontainer構築
7. GitHub用ファイル作成
8. 実行＆動作確認

# 📁 最終ファイル構成イメージ

```
test-ts-container-di-api/
├── .devcontainer/
│   ├── devcontainer.json
│   └── Dockerfile
├── src/
│   ├── app.ts
│   ├── main.ts
│   ├── router/
│   │   └── fileRouter.ts
│   ├── controller/
│   │   └── fileController.ts
│   ├── service/
│   │   └── fileService.ts
│   ├── repository/
│   │   └── fileRepository.ts
│   └── util/
│       └── logger.ts
├── test/
│   ├── controller/
│   ├── service/
│   ├── repository/
├── hello.txt
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

# 1. プロジェクト作成

事前にディレクトリをcloneもしくは作成

```bash
% nvm use 22.16.0
Now using node v22.16.0 (npm v10.9.2)
% node -v
v22.16.0
% npm init -y
```

# 2. 必要パッケージ導入

```bash
npm install express
npm install typescript ts-node @types/node @types/express --save-dev
npm install jest ts-jest @types/jest --save-dev
```

tsconfig.json 生成
```bash
npx tsc --init
```

以下を編集
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

# 3. スクリプト定義（package.json）

```json
"scripts": {
  "dev": "ts-node src/main.ts",
  "build": "tsc",
  "start": "node dist/main.js",
  "test": "jest",
  "ci": "npm ci"
}
```
