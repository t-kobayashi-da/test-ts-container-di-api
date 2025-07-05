import { FileService } from '../fileService';

describe('FileService', () => {
  it('getTextFile returns content from repository', () => {

    // モックのリポジトリを作成
    // FileRepositoryのインターフェースに合致するモックオブジェクトを作成
    const mockRepo = {

        // getFileContentメソッドをモック化
        // ここでは固定の文字列'service test'を返すように設定
        // これにより、FileServiceのgetTextFileメソッドをテストする際に
        // 実際のファイルシステムにアクセスせず、
        // モックのリポジトリを使ってテストを行うことができる
        // モックのリポジトリは、FileRepositoryのインターフェースに
        // 合致しているため、FileServiceは問題なく動作する
      getFileContent: jest.fn().mockReturnValue('service test') //jest.fn() → 実態のない偽物の関数, .mockReturnValue('mock text') → その関数が返す内容を決める
    };

    // DIでFileServiceにモックリポジトリを注入
    // jestのany型を使って型チェックを回避
    // ここではFileRepositoryの型を厳密にチェックしない
    // モックリポジトリはFileRepositoryのインターフェースに
    // 合致しているため、問題なく動作する
    // ただし、実際のプロジェクトでは型安全を保つため
    // きちんと型を定義することが望ましい
    // ここではテストの簡潔さを優先している
    // そのため、any型を使用している
    const service = new FileService(mockRepo as any);

    // getTextFileメソッドを呼び出して結果を取得
    // モックリポジトリのgetFileContentメソッドが呼ばれ、
    // 'service test'が返される
    // その結果をresult変数に格納
    // ここではモックのリポジトリを使っているため、
    // 実際のファイルシステムにはアクセスしない
    // そのため、テストは高速で安定している
    // モックのリポジトリを使うことで、外部依存性を排除し、
    // テストの信頼性を高めている
    // これにより、FileServiceのロジックを独立してテストできる
    const result = service.getTextFile();

    // 期待される結果をアサート
    // モックリポジトリのgetFileContentメソッドが呼ばれ、
    // 'service test'が返されることを確認
    expect(result).toBe('service test');

    // モックリポジトリのgetFileContentメソッドが呼ばれたことを確認
    // ここでは、FileServiceのgetTextFileメソッドが
    // モックリポジトリのgetFileContentメソッドを呼び出していることを確認
    // これにより、FileServiceが正しくモックリポジトリを使用していることを確認
    // モックのリポジトリを使うことで、テストの信頼性を高めている
    // これにより、FileServiceのロジックを独立してテスト
    // できることを確認
    expect(mockRepo.getFileContent).toHaveBeenCalled();
  })
})
