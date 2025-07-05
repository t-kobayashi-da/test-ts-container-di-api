# test-ts-container-di-api
TypeScript・DI・コンテナ構成の学習用API

# 💡 最終ゴール
TypeScript + Express によるWeb APIコンテナをDev Containerで構築し、以下を実現
- ✅ /file にGETアクセス → 「hello world!」のテキストファイル返却
- ✅ 依存性注入(DI)設計、service/repository/router/controller 分離
- ✅ ユニットテスト付き
- ✅ ログ出力あり
- ✅ npm ci クリーンインストール
- ✅ GitHub管理を前提に、ファイル構成を具体例提示

# 🛠 ステップ全体像
1. プロジェクト雛形作成（TypeScript + Node.js）
2. 必要パッケージ導入
3. ファイル構造整備（DI設計）
4. 各層のコード/ユニットテスト実装（テスト駆動開発）
5. 実行＆動作確認

# 📁 最終ファイル構成イメージ

```
test-ts-container-di-api/
├── src/
│   ├── app.ts
│   ├── main.ts
│   ├── repository/
│   │   ├── fileRepository.ts
│   │   └── __tests__/
│   │       └── fileRepository.test.ts
│   ├── service/
│   │   ├── fileService.ts
│   │   └── __tests__/
│   │       └── fileService.test.ts
│   ├── controller/
│   │   ├── fileController.ts
│   │   └── __tests__/
│   │       └── fileController.test.ts
│   ├── router/
│   │   ├── fileRouter.ts
│   │   └── __tests__/
│   │       └── fileRouter.test.ts
│   └── util/
│       ├── logger.ts
│       └── __tests__/
│           └── logger.test.ts
├── hello.txt
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

# 🚀 実践

## 1. プロジェクト作成

事前にディレクトリをcloneもしくは作成

```bash
% nvm use 22.16.0
Now using node v22.16.0 (npm v10.9.2)
% node -v
v22.16.0
% npm init -y
```

## 2. 必要パッケージ導入

```bash
npm install express
npm install typescript ts-node @types/node @types/express --save-dev
npm install jest ts-jest @types/jest --save-dev
npm install --save-dev supertest @types/supertest
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

jest初期設定
```bash
npx ts-jest config:init
```

## 3. スクリプト定義

package.json
```json
"scripts": {
  "dev": "ts-node src/main.ts",
  "build": "tsc",
  "start": "node dist/main.js",
  "test": "jest",
  "ci": "npm ci"
}
```

## 4. コード実装 (DI/テスト駆動開発)

今回のコードは「責務ごと」に4つのレイヤーに分離

レイヤー|ファイル|役割
--|--|--
Router|fileRouter.ts|エンドポイントの定義
Controller|fileController.ts|リクエスト単位の処理制御
Service|fileService.ts|ビジネスロジック(今回は簡単)
Repository|fileRepository.ts|ファイルなどの外部操作

この分離による恩恵
- 可読性アップ
- 変更の影響範囲が狭くなる
- テストしやすい構造

テスト駆動開発の場合は、以下の順での実装が良さそう
- 補足：なぜこの順番？
  - 揮発性依存から固める
    - 上位層が下位に依存する構造なので、下から順に作るとブレない
  - モックを前提に層ごとにテスト
    - ファイル実データには極力依存しない設計ができる
  - 最後にApp全体を組む
    - 単体品質を確保した上で、全体統合へ進める

### src/repository/fileRepository.ts
最下層・揮発性依存から着手
- 外部リソース（ファイル読み込み）の仕様を決めてテストを書く
- 内容が安定しないのでダミー・モックを使いやすくする

### hello.txt
Repositoryのテストを動かすため、必要最低限の実データ準備

### src/repository/__tests__/fileRepository.test.ts
RepositoryはfsをMock

### src/service/fileService.ts

### src/service/__tests__/fileService.test.ts
Repositoryを注入して、ビジネスロジック単位のテストを書く
- Repositoryはモック化し、本物のファイルには依存しない
- ロジックが正しいか純粋に検証できる

### src/util/logger.ts

### src/util/__tests__/logger.test.ts
Service層や以降の層で使う補助機能のため後回しでも良いが、TDD的には副作用を意識して早めに実装

### src/controller/fileController.ts

### src/controller/__tests__/fileController.test.ts
Serviceを注入してリクエスト単位のロジックを確認
- Serviceはモックで良い
- リクエスト→レスポンスの流れの単体テストを書く

### src/router/fileRouter.ts

### src/router/__tests__/fileRouter.test.ts
Expressのルーティングを最小構成でつなげる
- Controllerのテストが先にあるので、ここは結線確認がメイン

### src/app.ts
DIの全体構成をまとめる
- 各層が単体テスト済みなので、安全に組み合わせ可能
- App単位で統合テストも狙える

### src/main.ts
最終的なサーバー起動部分
- ここは実質「起動スクリプト」なのでTDDの範囲外でもよい
- 動作確認の最後で着手

## 5. 実行

### ビルド＆実行

```bash
npm ci
npm run build
npm run start
```

```bash
> test-ts-container-di-api@1.0.0 start
> node dist/main.js

Server is running on http://localhost:3000
```

### APIアクセス

```bash
curl http://localhost:3000/File
```

```
hello
world
!!
```

ファイル保存
```
curl -o {保存先ファイル名} http://localhost:3000/File
```

### テスト実行

```bash
npm run test
```

# メモ

## 今回のDIとテストの関係整理
DI（依存性注入）
- 依存するモジュールを「直接 new する」のではなく、外から渡す仕組み
- 結果：差し替え・テストがしやすくなる

ユニットテスト（Jest）
- 小さい単位（クラスや関数）ごとに正しく動くか確認
- モック（偽物）を注入して、実際の依存先に触れずにテストできる

### DIが無い場合の問題

例えば、FileService が勝手にリポジトリを new していたら：

```typescript
export class FileService {
  private repo = new FileRepository();  // 直接new

  getTextFile() {
    return this.repo.getFileContent();
  }
}
```

こうなると：
- テストでリポジトリを差し替えできない
- 実ファイルをいじらないとテストできない

→ テスト困難・結合度が高い・変更に弱い

### DIありのメリット

```typescript
export class FileService {
  constructor(private repo: FileRepository) {}

  getTextFile() {
    return this.repo.getFileContent();
  }
}
```

→ FileRepository を外から渡す構造

→ テスト時は「本物」でなく「偽物（モック）」を渡せる

### Jestの基本構文と用語

| 構文                  | 意味           |
| ------------------- | ------------ |
| `describe()`        | テストのグループ・分類  |
| `it()` または `test()` | 個別のテストケース    |
| `expect()`          | 結果の期待値を定義    |
| `jest.fn()`         | モック関数を作る（偽物） |
| `jest.mock()`       | モジュールごと差し替え  |

### テストダブルの使い分け

| 種類    | 特徴           | 例                                 |
| ----- | ------------ | --------------------------------- |
| Dummy | 使わないが引数に必要   | `new DummyUser()` だけ渡す            |
| Stub  | 固定の返り値だけ返す   | `jest.fn().mockReturnValue('固定')` |
| Mock  | 振る舞いの確認まで行う  | `expect(fn).toHaveBeenCalled()`   |
| Fake  | 簡易的な実装を自前で用意 | メモリ内だけのDB実装を手書き                   |

#### Stub: 戻り値確認だけ、呼び出しチェック不要
```typescript
const repoStub: Pick<FileRepository, 'getFileContent'> = {
  getFileContent: jest.fn().mockReturnValue('固定の内容')
};
```

#### Mock: 呼び出しも確実に行われたか確認する
```typescript
const repoMock: Pick<FileRepository, 'getFileContent'> = {
  getFileContent: jest.fn().mockReturnValue('mock')
};

const service = new FileService(repoMock);
service.getTextFile();

expect(repoMock.getFileContent).toHaveBeenCalled();
```

#### Fake: 実際に保存・取得できるが、本物のファイル操作は不要
```typescript
class FakeFileRepository implements FileRepository {
  private content = 'default';

  getFileContent() {
    return this.content;
  }

  saveFileContent(content: string) {
    this.content = content;
  }
}
```

#### 現場の使い分け

| 目的             | おすすめ手法    |
| -------------- | --------- |
| とにかく戻り値だけ固定したい | Stub＋Pick |
| 呼び出し確認も重視      | Mock＋Pick |
| 簡易的なロジックを動かす   | Fake      |
| 本物に近い完全確認      | 実物そのまま    |
