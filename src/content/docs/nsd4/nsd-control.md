---
title: nsd-control(8)
sidebar:
    order: 5
---
# nsd-control

Section: nsd 4.0.0 (8)<br />
Updated: Oct 29, 2013<br />
<hr />

## 名前

<p><strong>nsd-control,</strong> <strong>nsd-control-setup</strong> - NSDリモートサーバー制御ユーティリティ</p>

## 書式

<p><strong>nsd-control</strong> [<strong>-c</strong> <em>cfgfile</em>] [<strong>-s</strong> <em>server</em>] <em>command</em></p>

## 説明

<p><strong>nsd-control</strong>は<em><a href="../nsd/">nsd</a></em>(8) DNSサーバのリモート管理を行います。設定ファイルを読み込み、nsdサーバにSSL越しで接続し、コマンドを送り、結果を表示します。利用できるオプションは以下の通りです。</p>
<dl compact="compact">
<dt><strong>-h</strong></dt>
<dd>バージョンとコマンドライン オプションのヘルプを表示します。</dd>
<dt><strong>-c</strong> <em>cfgfile</em></dt>
<dd>設定を読み込む設定ファイル。省略したら、デフォルトの設定ファイル/etc/nsd/nsd.confが使われます。</dd>
<dt><strong>-s</strong> <em>server[@port]</em></dt>
<dd>接続するサーバのIPv4かIPv6のアドレス。省略したら、アドレスは設定ファイルから読まれます。</dd>
</dl>

## コマンド

<p>以下のコマンドが利用できます。</p>
<dl compact="compact">
<dt><strong>start</strong></dt>
<dd>サーバを起動します。単に<em><a href="../nsd/">nsd</a></em>(8)を実行します。nsdの実行ファイルは環境変数<strong>PATH</strong>から検索します。<em>-c</em>を使って指定した設定ファイルかデフォルトの設定ファイルを使って起動します。</dd>
<dt><strong>stop</strong></dt>
<dd>サーバを停止します。サーバ・デーモンが終了します</dd>
<dt><strong>reload [&lt;zone&gt;]</strong></dt>
<dd>ゾーンファイルを再読み込みし、ログファイルを開き直します。引数がない場合は、変更されたゾーンファイルを読み込みます。引数がある場合は、与えられたゾーンのゾーンファイルを読み込んでロードします。</dd>
<dt><strong>reconfig</strong></dt>
<dd>nsd.confをリロードして、TSIG鍵と設定ファイルのパターンの変更を適応し、さらに、設定に記述されたゾーンの追加や削除の変更を適応します。待ち受けているIPアドレスやポート番号やchrootのような他の変更は適応されません。パターンの更新はzonesの設定オプション（request-xfr、zonefile、notifyなど）が更新されたことを意味します。新しいパターンはaddzoneコマンド用にも利用できます。</dd>
<dt><strong>repattern</strong></dt>
<dd>reconfigオプションと同じです。</dd>
<dt><strong>log_reopen</strong></dt>
<dd>（ログファイルを移動して新しいログファイルを作成する）ログのローテーションのために、ログファイルを開き直します。kill -HUPでもログは再読み込みできます。このとき、すべてのゾーンファイルのリロードも行います。</dd>
<dt><strong>status</strong></dt>
<dd>サーバの状態を表示します。（ポートへの接続が拒否されて）動かなければ終了コードは3、エラーは1、動けば0です。</dd>
<dt><strong>stats</strong></dt>
<dd>統計情報を名前=値の並びで出力します。NSDがこのオプションが有効にされてコンパイルされている必要があります。</dd>
<dt><strong>stats_noreset</strong></dt>
<dd>statsと同じですが、カウンターをゼロにリセットしません。</dd>
<dt><strong>addzone &lt;zone name&gt; &lt;pattern name&gt;</strong></dt>
<dd>動作中のサーバーに新しいゾーンを追加します。再起動後も留まるように、ディスク上のゾーンリストファイルにゾーンが追加されます。パターン名は新しいゾーンに適応するオプションを決めます。スレーブゾーンでは、ゾーン転送がすぐに試みられます。ゾーンファイルを持つゾーンでは、ゾーンファイルの読み込みが試みられます。</dd>
<dt><strong>delzone &lt;zone name&gt;</strong></dt>
<dd>動作中のサーバーからゾーンを削除します。ゾーンはディスク上のゾーンリストのファイルとnsd.dbファイルとメモリから削除されます。ゾーンファイルを持っていたら、これは残されます（しかし、時代遅れかもしれません）。デーモンはnsd.confファイルに書けないのでnsd.confそのものに記述されたゾーンはこのように削除できません。delzoneコマンドでゾーンを削除できるようにゾーンリストのファイルにそのゾーンを追加する必要があります。</dd>
<dt><strong>write [&lt;zone&gt;]</strong></dt>
<dd>ゾーンファイルをディスクに書きます。あるいは、指定したゾーンファイルをディスクに書きます。（AXFRやIXFRで）変更されたゾーンが書かれるか、ゾーンファイルがまだ作成されていなければ作成されます。必要であればゾーンファイルのパスのディレクトリが作成されます。</dd>
<dt><strong>notify [&lt;zone&gt;]</strong></dt>
<dd>スレーブサーバーへNOTIFYメッセージを送信します。このサーバー上のマスターゾーンの'notify:'リストで設定されたIPアドレスに送信します。通常はマスターゾーンのシリアル値が更新されたときにNSDはNOFITYメッセージをすぐに送信します。ゾーンが指定されたら、通知はそのゾーンに送信されます。スレーブサーバーは（このサーバーか別のマスターに）後でゾーン転送要求を開始すると思われます。これは'provide-xfr:'ACLリスト設定で許可されます。</dd>
<dt><strong>transfer [&lt;zone&gt;]</strong></dt>
<dd>このサーバー上のスレーブゾーンの更新をマスターに対して試みます。マスターは'request-xfr:'リストで設定されます。ゾーンが与えられたら、そのゾーンが更新されます。通常は、新しいゾーンのシリアル値が転送されなければならない（'allow-notify:'ACLリストで設定された）マスターからNSDはNOTIFYを受信します。</dd>
<dt><strong>force_transfer [&lt;zone&gt;]</strong></dt>
<dd>このサーバー上のスレーブゾーンの更新を強制します。たとえマスターがゾーンの同じシリアル値を持っていても、完全なAXFRが取得のために実行されます。IXFRを使ったり、シリアル値の増分を確認したりしたい場合は、transferコマンドを使います。</dd>
<dt><strong>zonestatus [&lt;zone&gt;]</strong></dt>
<dd>要求されたときには、ゾーンの状態やシリアル値や更新日時を出力します。（どのサーバへのものなのか）通知の動作も出力します。たった今動作があればゾーン転送（とどのマスターからなのか）も出力します。</dd>
<dt><strong>serverpid</strong></dt>
<dd>サーバープロセスのPIDを出力します。これは統計情報のために使われます。NSDが統計が有効でコンパイルされたときのみ動きます。このPIDはUNIXシグナルを送信するためのものではないです。このためにはnsd.pidからPIDを使います。そのPIDは固定です。</dd>
<dt><strong>verbosity &lt;number&gt;</strong></dt>
<dd>ログ出力の饒舌さを変更します。</dd>
</dl>

## 終了コード

<p>nsd-controlプログラムは、エラーのときにはステータスコード1で、成功のときにはステータスコード0で終了します。</p>

## セットアップ

<p>セットアップはサーバとクライアントの両方に自己署名証明書とプライベート鍵を要求します。スクリプト <em>nsd-control-setup</em> はデフォルトの実行ディレクトリ、あるいは-dで指定した別のディレクトリにそれらを生成します。鍵ファイルへのアクセス制御の権限を変更すれば、全てのユーザではなくデフォルトの所有者とグループによりnsd-controlを誰が使うかを決めることができます。スクリプトはディレクトリに存在するプライベート鍵を保存します。rootとしてスクリプトを動かした後に、<em>nsd.conf</em>で<strong>control-enable</strong> をオンにしてください。</p>

## 統計カウンター

<p><em>stats</em>コマンドはたくさんの統計カウンターを表示します。</p>
<dl compact="compact">
<dt><em>num.queries</em></dt>
<dd>受信したクエリー（TCPとUDPのクエリーの合計）の数。</dd>
<dt><em>serverX.queries</em></dt>
<dd>サーバー プロセスにより処理されたクエリーの数。サーバー プロセスの数は設定の<strong>server-count</strong>で設定されます。</dd>
<dt><em>time.boot</em></dt>
<dd>サーバーが起動してからのアップタイム（秒）。小数部付き秒数で。</dd>
<dt><em>time.elapsed</em></dt>
<dd>前回の統計レポートからの経過時間（秒）。小数部付き秒数で。素早くポーリングしたらゼロになるはずです。前回のstatsコマンドではカウンターをリセットし、次回のstatsコマンドでは完全にゼロのレポートと経過時間ゼロを得ます。</dd>
<dt><em>size.db.disk</em></dt>
<dd>ディスク上のnsd.dbのサイズ（バイト）。</dd>
<dt><em>size.db.mem</em></dt>
<dd>メモリ上のDNSデータベースのサイズ（バイト）。</dd>
<dt><em>size.xfrd.mem</em></dt>
<dd>xfrdプロセスにおけるゾーン転送とnotifyのためのメモリのサイズ（バイト）。TSIGデータは除く。</dd>
<dt><em>size.config.disk</em></dt>
<dd>ディスク上のzonelistファイルのサイズ（バイト）。nsd.confのサイズを除く。</dd>
<dt><em>size.config.mem</em></dt>
<dd>メモリ上の設定データのサイズ（バイト）。サーバープロセスとxfrdプロセスで2個分になる。</dd>
<dt><em>num.type.X</em></dt>
<dd>このクエリータイプを持つクエリーの数。</dd>
<dt><em>num.opcode.X</em></dt>
<dd>このopcodeを持つクエリーの数。</dd>
<dt><em>num.class.X</em></dt>
<dd>このクエリークラスを持つクエリーの数。</dd>
<dt><em>num.rcode.X</em></dt>
<dd>このリターンコードの回答の数。</dd>
<dt><em>num.edns</em></dt>
<dd>EDNS OPTを持つクエリーの数。</dd>
<dt><em>num.ednserr</em></dt>
<dd>EDNS解析に失敗したクエリーの数。</dd>
<dt><em>num.udp</em></dt>
<dd>UDP ip4でのクエリーの数。</dd>
<dt><em>num.udp6</em></dt>
<dd>UDP ip6でのクエリーの数。</dd>
<dt><em>num.tcp</em></dt>
<dd>TCP ip4での接続数。</dd>
<dt><em>num.tcp6</em></dt>
<dd>TCP ip6での接続数。</dd>
<dt><em>num.answer_wo_aa</em></dt>
<dd>NOERROR rcodeでAAフラグなしの回答の数。リフェラルを含む。</dd>
<dt><em>num.rxerr</em></dt>
<dd>受信が失敗したクエリーの数。</dd>
<dt><em>num.txerr</em></dt>
<dd>送信が失敗した回答の数。</dd>
<dt><em>num.raxfr</em></dt>
<dd>クライアントからの（回答を提供した）AXFRリクエストの数。</dd>
<dt><em>num.truncated</em></dt>
<dd>TCフラグをセットした回答の数。.</dd>
<dt><em>num.dropped</em></dt>
<dd>健全性確認（sanity check）に失敗したために落とされたクエリーの数。</dd>
<dt><em>zone.master</em></dt>
<dd>提供されたマスターゾーンの数。'request-xfr:'エントリーを持たないゾーンです。</dd>
<dt><em>zone.slave</em></dt>
<dd>提供されたスレーブゾーンの数。'request-xfr'エントリを持つゾーンです。</dd>
</dl>

## ファイル

<dl compact="compact">
<dt><em>/etc/nsd/nsd.conf</em></dt>
<dd>nsd設定ファイル</dd>
<dt><em>/etc/nsd</em></dt>
<dd>プライベート鍵(nsd_server.keyとnsd_control.key)と自己署名証明書(nsd_server.pemとnsd_control.pem)を置くディレクトリ。</dd>
</dl>

## 関連項目

<p><em><a href="../nsd.conf/">nsd.conf</a></em>(5), <em><a href="../nsd/">nsd</a></em>(8), <em><a href="../nsd-checkconf/">nsd-checkconf</a></em>(8)</p>
<hr />


