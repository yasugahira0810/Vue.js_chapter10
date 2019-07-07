---
theme : "simple"
transition: "zoom"
highlightTheme: "darkula"
logoImg: "https://raw.githubusercontent.com/evilz/vscode-reveal/master/images/logo-v2.png"
slideNumber: true
---

## 10章
## 中規模・大規模向けのアプリケーション開発③
## 実装

---

:class="classes" データバインディングをするv-bindの省略記法
@click="handleClick" イベントハンドリングをするv-onの省略記法

--

9章
foo@domain.com
12345678


状態Auth

プロパティ: Vueインスタンスの挙動を決める要素

イベント: 

スロット（slot要素）

propsData1[参考]([https://lmiller1990.github.io/vue-testing-handbook/ja/components-with-props.html#propsdata%E3%81%AE%E5%9F%BA%E6%9C%AC%E7%9A%84%E3%81%AA%E4%BD%BF%E3%81%84%E6%96%B9](https://lmiller1990.github.io/vue-testing-handbook/ja/components-with-props.html#propsdataの基本的な使い方))

`propsData` は親コンポーネントから `props` として渡されたものとしてテストで使用できます。

KbnButtonのdisabledのfalseの試験、デフォルト値で試験してしまっているように見える。

明示的にfalseにするようitの中で設定すべきでは？問い合わせてみる

3.3.1

spy?

---

## 10章概要

大きく２つに分かれる

- 10.2〜10.4 ログインページの実装
- 10.5〜10.9 Vue.js開発を支える技術

なおボードページ、タスク詳細ページの実装の解説はしない（書籍自体に解説が載っていないので）  

また書籍はテスト駆動開発で解説しておりコードも載っているが、内容が古いとのことなので詳細な解説はしない

---

## 10.1 開発方針の整理

- **ログインページ**
  - **ログインページのコンポーネント**
  - **ログインページのデータフロー**
  - **全体のルーティング**
- ボードページ
- タスク詳細ページ

**加えて開発に必要な技術**

---



## 10.2 コンポーネントの実装

--

![KanbanApp](./img/KanbanApp.png)

- ボトムアップ的なアプローチを推奨

---

### 10.2.1 KbnButtonコンポーネント

- API設計は「9.2.3 KbnButtonコンポーネントのAPI」参照
- 書籍ではテスト駆動開発のスタイルで開発を進めている
- 9.2.3の設計項目に対してテストしている

--

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/components/atoms/C)

--

![KbnButtonTest](./img/KbnButtonTest.png)

---

### 10.2.2 KbnLoginFormコンポーネント

- ログインフォーム
- 入力情報をバリデーションする役割を持つ
- 認証処理はAuth APIモジュールに任せている

--

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/components/molecules/KbnLoginForm.vue)

--

![KbnLoginFormList](./img/KbnLoginFormList.png)

- validation, valid, disableLoginActionプロパティは算出プロパティ
- onloginプロパティは外部コンポーネントに処理を任せているので、コールバック時のログインOK/NGのみテスト

--

![KbnLoginFormTest1](./img/KbnLoginFormTest1.png)

--

![KbnLoginFormTest2](./img/KbnLoginFormTest2.png)

---

### 10.2.3 KbnLoginViewコンポーネント

- データフロー設計は「9.3.2 データフロー」参照
- ルーティング設計は「9.4 ルーティング設計」参照
- ログイン処理について検証
- KbnLoginFormコンポーネントのスタブを利用

--

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/components/templates/KbnLoginView.vue)

--

![KbnLoginViewTest](./img/KbnLoginViewTest.png)

---

## 10.3 データフローの実装

--

### 10.3.1 loginアクションハンドラ

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/store/actions.js)

--

![LoginActionHandlerTest](./img/LoginActionHandlerTest.png)

---

### 10.3.2 AUTH_LOGINミューテーションハンドラ

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/store/mutations.js)

--

![MutationHandlerTest](./img/MutationHandlerTest.png)

---

### 10.3.3 AuthAPIモジュール

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/api/auth.js)

--

![AuthAPIModuleTest](./img/AuthAPIModuleTest.png)

---

### 10.4 ルーティングの実装

--

### 10.4.1 beforeEachガードフックを活用したナビゲーションガード

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/router/guards.js)

--

![BeforeEachGuardHookTest](./img/BeforeEachGuardHookTest.png)


---

## 10.5
## 開発サーバーとデバッグ

- 10.5.1 開発サーバーによる開発
  + タスクコマンドnpm run devを解説
- 10.5.2 Vue DevToolsによるデバッグ
  + 開発効率化拡張機能を解説

--

### 10.5.1 開発サーバーによる開発

- バックエンドのAPIサーバーを作成していないので、ログインボタンをクリックしても404になる
- 対処法は以下の２つ。今回は後者を採用
  1. APIのプロキシ機能を利用してバックエンドとインテグレートする
  2. ローカル環境の開発サーバーに該当エンドポイントのモックを実装する

--

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/build/dev-server.js)

- 以下のレスポンスを返す簡易的な実装
![dev-serverResponse](./img/dev-serverResponse.png)

--

- Vue UIのstartを実行すると「npm run dev」が実行されるので、これでいい感ある

![VueUIStart](./img/VueUIStart.png)

---

### 10.5.2 Vue DevToolsによるデバッグ

- Chromeに拡張機能「Vue DevTools」を追加する
- Vue.jsが検知されるとアイコンが有効になる
- ディベロッパーツールに「Vue」タブが追加される

![VueDevTools1](./img/VueDevTools1.png)

--

- 書籍でピックアップされている機能

![VueDevTools2](./img/VueDevTools2.png)

---

## 10.6 E2Eテスト

--

- 単体テストだけでは実際の動作を確認できない
- 手動テストは作業量が膨大で大変
- E2Eテストフレームワークによる自動化が一般的
  + ここではNightWatchを使う

--

[テストコード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/test/e2e/specs/login.js)

--

![e2eTest](./img/e2eTest.png)

---

## 10.7 アプリケーションのエラーハンドリング

--

- 単体テストやE2Eテストを見てきたが、想定できないエラーが発生する可能性はある
- Vue.jsのようなインタラクティブなUIを実装したアプリではエラーハンドリングは特に重要
- エラーを捕捉して適切にエラーハンドリングしないと、UIが壊れる可能性がある
- Vue.jsが提供するエラーハンドリングの仕組み
  + 子コンポーネントのエラーハンドリング
  + グローバルなエラーハンドリング

--

### 10.7.1 子コンポーネントのエラーハンドリング

![errorCaptured1](./img/errorCaptured1.png)

--

![errorCaptured2](./img/errorCaptured2.png)

--

![errorCaptured3](./img/errorCaptured3.png)

--

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/ErrorBoundary.vue)

--

### 10.7.2 グローバルなエラーハンドリング

![errorHandler1](./img/errorHandler1.png)

--

![errorHandler2](./img/errorHandler2.png)

--

![errorHandler3](./img/errorHandler3.png)

--

![errorHandler4](./img/errorHandler4.png)

--

[コード（GitHubへ飛ぶ）](https://github.com/yasugahira0810/Vue.js_chapter10/blob/master/kanban-app/src/main.js)

---

## 10.8 ビルドとデプロイ

0.5H

## 10.9 パフォーマンス測定・改善

3H

計16H

### *注意事項*

- *このリポジトリは[[秋葉原] Vue.js入門 輪読会 2章 Vue.jsの基礎 (初心者歓迎！)](https://weeyble-js.connpass.com/event/131771/)の発表資料として用意したリポジトリです。*
- *書籍の要約は正体、担当者の理解で書いているところは斜体で記載しています*
- *対象は2章の前半（2.1〜2.6）のみです。2.7以降は作っていません*
- *権利関係で問題があればご指摘ください*
- *vscode-revealで見てもらうことを想定しています*
  + *Windowsは改行コードをLFにして見てください*

--

### 自己紹介

- 安ヶ平雄太（yasugahira0810）と申します
- SIerのアジャイル推進部隊でスクラムマスターしてます  
  その前はインフラエンジニアだったので真面目にJSやVue.js使ってないです
- 去年の輪読会で作った資料たち
  + [猫本 3章 双方向データバインティング](https://github.com/yasugahira0810/vuejs_chapter3)
  + [猫本 8章 Vuex](https://github.com/yasugahira0810/vuejs_chapter8)
  + [Vue.js入門 4章 Vue Router](https://github.com/yasugahira0810/Vue.js_chapter4)

---

## 10.2 コンポーネントの実装

### 10.2.1 KbnButtonコンポーネント

### 10.2.2 KbnLoginFormコンポーネント

### 10.2.3 KbnLoginViewコンポーネント

--

### 2章前半の概要

- 2.1 Vue.jsでUIを構築する際の考え方  
  => jQueryとは違うから注意！という抽象的な話
- 2.2 Vue.jsの導入  
  => script要素でVue.jsを読み込む話

--

### 2章前半の概要

- 2.3〜2.5  
  => Vueインスタンスとプロパティの話
```js
var vm = new Vue({ //2.3 Vueオブジェクト
            el: value, //2.4 Vueインスタンスのマウント
            data: value, //2.5 UIのデータ定義（data）
            filters: value, 
            methods: value,
            computed: value
        })
```
- 2.6 テンプレート構文  
  => VueインスタンスのデータをDOMに反映する話

---

## 2.1 Vue.jsでUIを構築する際の考え方

--

- jQueryのコーディングスタイルからVue.jsのコーディングスタイルへ頭を切り替える必要がある

--

![イベントとDOM要素の関係](fig/fig_2.1.jpeg)

--

||jQuery|Vue.js|
|---|---|---|
|特徴|イベントリスナーが自身や他のDOM要素を操作|イベントと要素の間に「UIの状態」（state）が挟まる|
|イベントや要素の増加による影響|イベントの要素にどのような影響を与えるか、イベントと要素の組み合わせを意識する必要がある|イベントによるUIの状態の変更、それに伴うDOMツリーやDOM要素の更新に分けて単純に考えることができる|

--

||jQuery|Vue.js|
|---|---|---|
|コーディングスタイル|**DOMツリーを中心に捉える。**DOMツリーがUIの状態を持っており、イベントによってDOMツリーをどのように変更するか考える|**UIの構築を担うJavaScriptのオブジェクト(仮想DOM)を中心に捉える。**データ、ビュー、アクションという3つの視点を切り替えながら、UIの構築を進めていく|

--

### *参考*

- [*なぜ仮想DOMという概念が俺達の魂を震えさせるのか*](https://qiita.com/mizchi/items/4d25bc26def1719d52e6)
  + *仮想DOMとは何か、なぜ仮想DOMか*
  + *Fluxとは何か、なぜ今Fluxか*
  + *フロントエンドのパラダイムシフトの概要を抑えられてわかりやすい。（Vueの話はない）*
- [*mozaic.fm ep13 Virtual DOM*](https://mozaic.fm/episodes/13/virtual-dom.html)
  + *上の記事を踏まえたPodcast*

  <span style="font-size: 60%">*正直、難しくてよく分かってない。ただ分からなくてもこの後のVue.jsの基本部分を読み進める分にはそんなに問題ないと思う*</span>

---

## 2.2 Vue.jsの導入

--

- script要素で直接Vue.jsを読み込んで、Vue.jsのデータバインディングを体感する
  + バインディング: JavaScriptのデータとDOM要素を結びつけること（1.2.3参照）  
  <img src="fig/fig_2.2.png" style="width:60%;"/>
- [サンプルコード](https://github.com/yasugahira0810/Vue.js_chapter2/blob/master/2.2.html), [デモ](2.2.html)

--

### Column Vue.jsの高度な環境構築

- 本章はVue.jsの基本機能の利用のみなので、script要素でライブラリを直接読み込む簡易な開発方法を用いた
- SPAなど複数ファイルで構成されるアプリを開発する際はwebpackなどのバンドルツールを利用すべき
- Vue CLIを用いると高度な環境を比較的簡単に構築できる。Vue CLIは6章で紹介する

---

## 2.3 Vueオブジェクト

--

- Vue.jsのファイルを読み込むとグローバル変数Vueが定義される
- グローバル変数Vueは複数の役割を持ったオブジェクト
  + Vueインスタンスを生成する**コンストラクタ**  
    => 2.3.1で説明
  + Vue.jsのAPIを束ねる名前空間（**モジュール**）  
    => 2.3.2で説明

--

### 2.3.1 コンストラクタ

- JSではコンストラクタはオブジェクトを生成するための関数
- 通常の関数呼び出しと異なりnew演算子を使う
- 生成されたオブジェクトが**Vueインスタンス**
- DOMにマウントすることでVueの機能が使える
<img src="fig/fig_2.2.png" style="width:60%;"/>

--

- Vueインスタンスの生成例（2.2からの再掲）
```js
        new Vue({
            el: '#app',
            data: {
                message: 'こんにちは!'
            }
        });
```

- 「el」や「data」はコンストラクタの引数で、オプションオブジェクトという
- オプションオブジェクトの内容によってVueインスタンスやUIの挙動が決まる
- 本節で主要なオプションを扱う（次スライド）

--

|オプション名|内容|紹介箇所|
|------|------|------|
|data|UIの状態・データ|2.5|
|el|VueインスタンスをマウントするDOM要素|2.4|
|filters|データを文字列と整形する|2.7|
|methods|イベント発生時などの振舞い|2.10|
|computed|データから派生した算出値　（算出プロパティ）|2.8|

- <span style="font-size: 60%">*オプション名がこの後「elプロパティ」のように言い換えられるので注意*</span>
- <span style="font-size: 60%">*JSの文法的にはオプション, Vue.jsの用語的にはプロパティというイメージと思う*</span>

--

- *[2.11のVueインスタンスの定義](https://github.com/yasugahira0810/Vue.js_chapter2/blob/master/2.11.html)は全部使ってるので覗いてみよう！*

--

### Vueインスタンスを変数に代入する理由は？

- 本節では説明の都合上変数に代入しているが、代入せずに用いることも可能
- 実際の開発では、複数のVueインスタンスがコミュニケーションする際に変数に代入する
- サンプルの変数名vmはMVVMパターンのViewModelが由来
- <span style="font-size: 60%">*SNSの例はよくわからないので説明省略*</span>
- <span style="font-size: 60%">*デバッグしやすいからとりあえず変数に突っ込んでおけばいいじゃん、と思うのはダメなのだろうか。。。*</span>

--

### Column MVVMパターン

- ソフトウェアアーキテクチャパターンの一種
  + M: ビジネスロジックや内部の処理を担うModel
  + V: レイアウトや見た目を担うView
  + VM: View向けの状態の管理を担うViewModel
- 本書では詳細な解説はしない

--

### 2.3.2 コンポーネント

- Vue.jsでも先ほどのVueインスタンスを分割できる
  + プログラミングにおいて関数を適切な粒度・役割で分割するのと同様
- この分割単位を**コンポーネント**と呼ぶ
  + Vueオブジェクトのcomponentメソッドでアプリ全体で使うコンポーネントを登録可能
  + Vueインスタンス生成時のオプションのcomponentsプロパティで、そのVueインスタンスのスコープだけで利用できるコンポーネントを登録可能（*意味がわからないよ。。。*）
  + 次章で説明（*だそうなので、気にせず進もう*）

--

### 2.3.2 コンポーネント[発表後追記]

- 発表時に以下の通りコメントいただきました。感謝
  + コンポーネントはVue.js特有の用語ではなく、JSの用語
  + Vue.jsはコンポーネント志向
  + マウントした要素とその子孫がVueインスタンスのスコープになるということを言っている
  + *2章の中だと2.4.1の話が近い？詳しくは3章見てみよう*

---

## 2.4 Vueインスタンスのマウント

--

- Vue.jsの処理は、2.3で説明したVueインスタンスをDOM要素にマウントするところから始まる
  + マウント: 既存のDOM要素をVue.jsが生成するDOM要素で置き換えること

<img src="fig/fig_2.2.png" style="width:60%;"/>

--

- 本節では2通りのDOM要素の指定方法を紹介
  + 2.4.1 インスタンス生成時にelプロパティで与える方法
  + 2.4.2 $mountメソッドを呼び出して後から指定する方法

--

### 2.4.1 Vueインスタンスの適用（el）

- オプションオブジェクトのelプロパティで指定したDOM要素がマウント対象になる
- elプロパティにはDOM要素のオブジェクトかCSSセレクタの文字列を指定できる
- マウントするとマウントした要素とその子孫が置き換えられる
- 従ってVue.jsの機能はマウントする要素とその子孫でのみ有効になる

--

- 前提: elプロパティで#appが指定されている
<img src="fig/fig_2.4.png" style="width:60%;"/>
- *また[2.11のサンプル](https://github.com/yasugahira0810/Vue.js_chapter2/blob/master/2.11.html)見て感覚を掴もう！*

--

### 2.4.2 メソッドによるマウント（$mountメソッド）

- Vueインスタンス生成時にelプロパティを定義せずとも、$mountメソッドでマウントができる
- マウント対象のDOM要素がUI操作や通信などで遅延的に追加される場合に使う

--

### Column Vue.jsを既存アプリケーションに導入する

- 既存アプリへの導入時もDOM要素を作成してマウントするところは同じ
- 既存アプリのテンプレートエンジンによっては、Vue.jsのシンタックスシュガー（@click, :disabled など）が使えないので、その場合は正式な書き方で記述する

---

## 2.5 UIのデータ定義（data）

--

### dataプロパティ

- UIの状態となるデータのオブジェクトを指定
- Vue.jsのリアクティブシステムに乗る（1.5.2参照）
- dataにはオブジェクトか関数を渡せる  
  渡したオブジェクトはテンプレートから参照できる
- [サンプルコード](https://github.com/yasugahira0810/Vue.js_chapter2/blob/master/2.5.html), [デモ](2.5.html)

--

### *ちょっと寄り道　JSFiddleのこと*

- *書籍に載っている<https://jsfiddle.net/kitak/ufzsw5jL>にアクセスすると、何もないやんけ！という気持ちになる(土台のページとのことだけど）*
- *いじっていて気づいたが、JSFiddleは保存すると元のURLの後に保存回数のリソースが切られるらしい*
- *<https://jsfiddle.net/kitak/ufzsw5jL/4>にアクセスすると2.5節のサンプルが見れるので、手っ取り早く触りたい人はアクセスしてみよう*

--

### 2.5.1 Vueインスタンスの確認

- 先ほどのサンプルを使って、Vueインスタンスがどうなっているか確認する
- Vueインスタンスはブラウザの開発者ツールで確認する
- Google ChromeならChrome DevToolsのConsoleに「console.log(vm)」と打ち込む

--

<img src="fig/fig_2.5_1.png" style="width:55%;"/>

<span style="font-size: 60%">*出力結果。最初は「items: (...)」みたいに閉じているけど、クリックすれば開く*</span>

--


### DevToolsでわかる2つのこと❶

- $elからVueインスタンスをマウントしたDOM要素にアクセスできる
<center><img src="fig/fig_2.5_2.png" style="width:70%;"/></center>
- <span style="font-size: 60%">*左がコード、右がVueインスタンス。確かにpタグらしきものがある*</span>
- <span style="font-size: 60%">*$始まりのプロパティやメソッドはVue.jsが提供。_始まりはVue.jsが内部利用*</span>

--

### DevToolsでわかる2つのこと❷

- dataに与えたキー名（ここではitems）がVueインスタンスの直下でプロパティとして公開されている
<center><img src="fig/fig_2.5_3.png" style="width:100%;"/></center>
- <span style="font-size: 60%">*console.log(vm.items)でitemsの内容を取得できる。console.log(vm.data.items)はエラー*</span>

--

### 2.5.2 データの変更を検知する

- Vue.jsでは、データの変更を検知して自動で画面を更新するため、データの代入と参照は監視される
- 先ほどの例で言えば、itemsの値を更新すると、それがトリガーとなってビューの再描画・DOM要素の更新が行われる
- **これがVue.jsのリアクティブシステムの力だ!**(ﾄﾞﾔｧ)

--

### データ変更の例

<center><img src="fig/fig_2.5_4.png" style="width:100%;"/></center>
- <span style="font-size: 60%">*左が変更前、右が変更後。vm.items[0].name="万年筆"」と打ってターン！とすればDOM要素も書き換わる*</span>

--

### $watchによる監視

- $watchメソッドは、Vueインスタンスの変更を検知してそれを元に動作する
- $watchメソッド
  + 第一引数：監視対象の値を返す関数
  + 第二引数：値が変わった場合に呼ばれるコールバック関数

--

### サンプル使ってやってみよう

```js
vm.$watch(function () {
  //鉛筆の個数
  return this.items[0].quantity
}, function (quantity) {
  //このコールバックは、鉛筆の購入個数が変更されたら呼ばれます
  console.log(quantity)
  this.items[0].name="へ〜い！" + this.items[0].name + quantity + "本、ご注文いただきました〜。喜んで〜"
})
```
- DevToolsのConsoleにvm.items[0].quantity=100と打ってみよう！

---

## 2.6 テンプレート構文

--

### テンプレート？

- VueインスタンスのデータからDOMを作る**手段**
- 両者を宣言的に定義する（データバインディング）
<center><img src="fig/fig_2.2.png" style="width:60%;"/></center>
- <span style="font-size: 60%">2章は右側から順に説明してきた。本節はデータからDOMを構築する手段の説明*</span>

--

### テンプレート構文で重要な概念

- Mustache記法によるデータの展開
  + HTMLのテキストコンテンツへのデータ展開で用いる
  + {{と}}の間にデータや式を記述する
- ディレクティブによるHTML要素の拡張
  + HTMLの属性を用いて独自の拡張を行うために用いる
  + 名前がv-で始まる
  + 2.9節で解説

--

### 2.6.1 テキストへの展開

- VueインスタンスのデータをHTMLのテキストコンテンツとして展開
- これまで見てきたdataプロパティで定義したデータの他に以下が扱える
  + データから派生して算出される**算出プロパティ**（2.8節）
  + イベント発生時の振る舞いを定義する**メソッド**（2.11節）
  + データを文字列と整形する**フィルタ**（2.7節）
- データ変更時のHTMLへの反映はVue.jsが担う  
  開発者は少ないコード量で動的なUIを実装できる

--

### 2.6.2 属性値の展開

- これまではHTMLのテキストコンテンツへの展開の例を見てきた（鉛筆=>万年筆とか）
- それ以外にDOM要素の属性に対しても展開できる
- 属性の展開にMustache記法は使えないので  
  **v-bind:属性名="データを展開した属性値"**を使う
- v-bindは2.9でやるディレクティブの１つ
- 以降、1つのサンプルで2つの属性の展開を示す

--

### 例1: title属性の展開

- title属性は要素の補足情報を表す属性
- 一般的にはマウスオーバー時にツールチップで表示
- 例ではtitle属性にdataプロパティのloggedInButtonを与える
- [サンプルコード](https://github.com/yasugahira0810/Vue.js_chapter2/blob/master/2.6.html), [デモ](2.6.html)

--

### 例2: disabled属性の展開

- disabled属性はフォーム要素を非活性にする属性
- &lt;button disabled&gt;購入&lt;/button&gt;と書くと<button disabled>購入</button>のように購入ボタンが非活性で表示される
- 例のcanBuyキーは参照時に真偽値を返すデータ  
  v-bind: disabledでは!で真偽値を反転させている
- サンプル, デモのリンクは前ページと同じ

--

- 左はdisbledの真偽値が偽の場合、右は真の場合。
<center><img src="fig/fig_2.6.png" style="width:100%;"/></center>
- <span style="font-size: 60%">偽の場合、disabled=falseになるのではなく、disabled属性が削除される</span>
- <span style="font-size: 60%">*真の場合のdisabled="disabled"に若干違和感を覚えるが、書籍には言及無いのでスルー*</span>

--

### 2.6.3 JacaScript式の展開

- 展開はデータのバインディングだけではなくJavaScript式もサポート
- Mustache形式とv-bindの両方をサポート
- ただしJavaScriptの式は1つしか書けない
- 複雑なことがしたい場合は算出プロパティやメソッドを使う
- 定期的に見直して、複雑になっていたら移動の検討をすることが大事
- 例：
```html
<p>{{ items[0].price * tems[0].quantity }}</p>
```

---

## 突然のハンズオンタイム

--

- 2.6のサンプルコードを一緒にいじってみましょう
- おいでませ[【ハンズオン用のJSFiddle】](https://jsfiddle.net/yasugahira0810/a687mwrz/3/)
<center><img src="fig/fig_handson1.png" style="width:70%;"/></center>
<center>https://jsfiddle.net/yasugahira0810/a687mwrz/3/</center>
<center>こんな画面が見えればOK</center>
--

### ハンズオン１

**やること: 購入ボタンを非活性にする**

- 手順
  1. DevToolsのConsoleを開く
  2. 左上のプルダウンをtopからresult〜へ変更する
  3. （JSを見るとVueインスタンスを変数vmに格納していることを確認する）
  4. （data配下のキー名はvm.キー名でアクセスできることを思い出す）
  5. Consoleに「vm.canBuy=false」と打ち込む
  6. 購入ボタンが非活性かされることを確認する

--

### ハンズオン2

**やること: $watchでツールチップを変更する**

- 現状だと購入ボタンが非活性なのに「ログイン済のため購入できます。」のツールチップが出てしまう
- 2.5.2でやった$watchを使ってcanBuyの真偽値を監視して、適切なツールチップを表示しよう

--

- 手順

- Consoleに以下を打ち込む
```js
vm.$watch(function () {
    return this.canBuy
  }, function (canBuy) {
    if(canBuy == true) {
        this.loggedInButton="ログイン済のため購入できます。"
      } else if (canBuy == false) {
        this.loggedInButton="おまえに食わせる鉛筆はねぇ！"
      }
  })
```

- vm.canBuy=true, vm.canBuy=falseと打って、ツールチップがボタンの活性・非活性に伴って適切に変更されることを確認する

---

### 2章前半の概要（再掲）

- 2.1 Vue.jsでUIを構築する際の考え方  
  => jQueryとは違うから注意！という抽象的な話
- 2.2 Vue.jsの導入  
  => script要素でVue.jsを読み込む話

--

### 2章前半の概要（再掲）

- 2.3〜2.5  
  => Vueインスタンスとプロパティの話
```js
var vm = new Vue({ //2.3 Vueオブジェクト
            el: value, //2.4 Vueインスタンスのマウント
            data: value, //2.5 UIのデータ定義（data）
            filters: value, 
            methods: value,
            computed: value
        })
```
- 2.6 テンプレート構文  
  => VueインスタンスのデータをDOMに反映する話

--

### *2章後半の注意点メモ[発表後追加]*

- 2.8.1のthisの話大事
  + methodの中のthisなにかわかるように
  + Vueに宣言的に書くからvue.data.msgじゃない
  + VueのthisとJSのthisと混乱しないように
  + JSのthisで検索するといっぱい出てくるはず
- キー書かないとバグりやすいコードを書けてしまう
- ライフサイクル。createで動かなくてmountで動くとかある
