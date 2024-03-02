---
title: nsd.conf(5)
sidebar:
    order: 3
---
# nsd.conf

Section: nsd 4.0.0 (5)<br />
Updated: Oct 29, 2013<br />
<hr />

## 名前

<p><strong>nsd.conf</strong> - NSD設定ファイル</p>

## 書式

<p><strong>nsd.conf</strong></p>

## 説明

<p><strong>nsd.conf</strong>は<a href="../nsd/">nsd</a>(8)を設定するために使われます。このファイル形式は属性と値を持ちます。属性の内側に属性を持つものもあります。記述方法は"属性: 値"です。</p>
<p>コメントは#で始まり、行の終わりまで続きます。空行も行の先頭の空白も無視されます。</p>
<p><strong>nsd.conf</strong>はnsdサーバ－、ゾーンファイル、プライマリ、セカンダリのオプションを指定します。</p>

### 例

<p>短いnsd.confの例を以下に示します。</p>
<p># Example.com nsd.conf file</p>
<dl compact="compact">
<dd># This is a comment.</dd>
</dl>
<dl compact="compact">
<dt>server:</dt>
<dd>
<dl compact="compact">
<dd>database: "/var/db/nsd/nsd.db"</dd>
</dl>
<dl compact="compact">
<dd>zonelistfile: "/var/db/nsd/zone.list"</dd>
</dl>
<dl compact="compact">
<dd>username: nsd</dd>
</dl>
<dl compact="compact">
<dd>logfile: "/var/log/nsd.log"</dd>
</dl>
<dl compact="compact">
<dd>pidfile: "/var/run/nsd.pid"</dd>
</dl>
<dl compact="compact">
<dd>xfrdfile: "/var/db/nsd/xfrd.state"</dd>
</dl>
</dd>
<dt>zone:</dt>
<dd>
<dl compact="compact">
<dd>name: example.com</dd>
</dl>
<dl compact="compact">
<dd># note that quotes are optional on the value</dd>
</dl>
<dl compact="compact">
<dd>zonefile: /etc/nsd/example.com.zone</dd>
</dl>
</dd>
</dl>

## ファイル形式

<p>キーワード間には空白が必要です。属性のキーワードはコロン':'で終わります。属性の次には属性あるいは値が続きます。トップレベルでは、<strong>server:</strong>や<strong>key:</strong>や<strong>pattern:</strong>や<strong>zone:</strong>のみが許可されます。これらには、属性や新しい<strong>server:</strong>や <strong>key:</strong>や <strong>pattern:</strong>や<strong>zone:</strong>節が続きます。 <strong>zone:</strong>&gt;属性には、ゾーン オプションが後に続きます。 <strong>server:</strong>属性には、<strong>NSD</strong>サーバーのグローバルオプションが後に続きます。<strong>key:</strong> &gt;属性は認証の鍵を定義するために使われます。<strong>pattern:</strong>属性には、パターンを利用するゾーンのオプションが後に続きます。<strong>include:</strong>ディレクティブを使ってファイルを取り込むことができます。これはどこでも記述することができ、引数に一つのファイル名を取ります。取り込んだファイルのテキストはその箇所で設定ファイルにコピーされたような処理を行います。chrootが使われるときには（chrootを前に付けた）絶対ファイル名が必要です。（chrootが何であるかを知っていて）chrootするアプリケーションの前後にincludeが解析されます。</p>

### サーバのオプション

<p>グローバル オプションは（NSDのコマンドラインにより優先されていなければ）<strong>server:</strong>節から取得されます。一つの<strong>server:</strong>節のみ許容されます。</p>
<dl compact="compact">
<dt><strong>ip-address:</strong> &lt;ip4 or ip6&gt;[@port]</dt>
<dd>NSDはそのIPアドレスにバインドします。複数のIPアドレスにバインドするために複数回記述することができます。任意で、ポート番号を記述することもできます。一つも記述されなければ、NSDはワイルドカード インターフェースで待ち受けます。コマンドライン オプションの<strong>-a</strong>と同じです。</dd>
<dt><strong>ip-transparent:</strong> &lt;yes or no&gt;</dt>
<dd>NSDがローカルでないアドレスにバインドすることを許可します。デフォルトはnoです。</dd>
<dt><strong>debug-mode:</strong> &lt;yes or no&gt;</dt>
<dd>nsdのデバッグ モードを有効にし、デーモン プロセスをフォークしません。デフォルトはnoです。コマンドライン オプションの<strong>-d</strong>と同じです。</dd>
<dt><strong>do-ip4:</strong> &lt;yes or no&gt;</dt>
<dd>yesであれば、NSDはIPv4の接続を待ち受けます。デフォルトはyesです。</dd>
<dt><strong>do-ip6:</strong> &lt;yes or no&gt;</dt>
<dd>yesであれば、NSDはIPv6の接続を待ち受けます。デフォルトはyesです。</dd>
<dt><strong>database:</strong> &lt;filename&gt;</dt>
<dd>デフォルトで<em>/var/db/nsd/nsd.db</em>が使われます。指定したファイルはコンパイルされたゾーン情報を格納するために使われます。コマンドライン オプションの<strong>-f</strong>と同じです。</dd>
<dt><strong>zonelistfile:</strong> &lt;filename&gt;</dt>
<dd>デフォルトで<em>/var/db/nsd/zone.list</em>が使われます。指定したファイルは動的に追加されるゾーンのリストを格納するために使われます。このリストはNSDによりゾーンの追加や削除のために書き込まれます。これは各行にゾーン名とパターン名を持つテキストファイルです。このファイルはnsd-controlのaddzoneとdelzoneコマンドにより使われます。</dd>
<dt><strong>identity:</strong> &lt;string&gt;</dt>
<dd>CH TXT ID.SERVER.を尋ねられたときに、指定された識別子を返します。デフォルトはgethostname(3)により返される名前です。コマンドライン オプションの<strong>-i</strong>と同じです。</dd>
<dt><strong>nsid:</strong> &lt;string&gt;</dt>
<dd>NSID EDNS有効パケットでクエリーが行われたときに回答のEDNSセクションに指定したnsidを追加します。コマンドライン オプションの<strong>-I</strong>と同じです。</dd>
<dt><strong>logfile:</strong> &lt;filename&gt;</dt>
<dd>指定したログファイルにメッセージを記録します。デフォルトは標準エラーと（ファシリティLOG_DAEMONで）syslogにログを記録します。コマンドライン オプション<strong>-l</strong>と同じです。</dd>
<dt><strong>server-count:</strong> &lt;number&gt;</dt>
<dd>指定した数のNSDサーバを開始します。デフォルトは1です。コマンドライン オプションの<strong>-N</strong>と同じです。</dd>
<dt><strong>tcp-count:</strong> &lt;number&gt;</dt>
<dd>各サーバーの最大同時TCP接続数。デフォルトは100です。コマンドライン オプションの<strong>-n</strong>と同じです。</dd>
<dt><strong>tcp-query-count:</strong> &lt;number&gt;</dt>
<dd>一つのTCP接続で対応する最大クエリー数。デフォルトは0です。これは最大限なしを意味します。</dd>
<dt><strong>tcp-timeout:</strong> &lt;number&gt;</dt>
<dd>デフォルトのTCPタイムアウトに優先します。これはTCPでのゾーン転送にも影響があります。</dd>
<dt><strong>ipv4-edns-size:</strong> &lt;number&gt;</dt>
<dd>好ましいIPv4のEDNSバッファサイズ。</dd>
<dt><strong>ipv6-edns-size:</strong> &lt;number&gt;</dt>
<dd>好ましいIPv6のEDNSバッファサイズ。</dd>
<dt><strong>pidfile:</strong> &lt;filename&gt;</dt>
<dd>プラットフォーム特有のデフォルトのPIDファイル（大抵は<em>/var/run/nsd.pid.</em>）の代わりに指定したPIDファイルを使います。コマンドライン オプションの<strong>-P</strong>と同じです。</dd>
<dt><strong>port:</strong> &lt;number&gt;</dt>
<dd>指定したポート番号でクエリーに回答します。デフォルトは53です。コマンドライン オプションの<strong>-p</strong>と同じです。</dd>
<dt><strong>statistics:</strong> &lt;number&gt;</dt>
<dd>存在しなければ、統計情報をダンプしません。統計情報は指定した秒数毎に生成されます。コマンドライン オプションの<strong>-s</strong>と同じです。</dd>
<dt><strong>chroot:</strong> &lt;directory&gt;</dt>
<dd>NSDは指定したディレクトリで起動時にchrootします。設定のどこかで、chrootの内側のファイルへの絶対パス名を指定する場合は、<strong>chroot</strong>パスを前に付けなければならない点に注意してください。そのように、あなたは設定のどこかを修正する必要なしにchrootオプションを変えることができます。chrootを無効にするには""（空文字）を設定します。デフォルトでは "<em></em>"が使われます。コマンドライン オプションの <strong>-t</strong>と同じです。</dd>
<dt><strong>username:</strong> &lt;username&gt;</dt>
<dd>ソケットにバインドした後に、ユーザー権限を落とし、指定したユーザーになります。ユーザー名かidかid.gidでなければなりません。コマンドライン オプションの<strong>-u</strong>と同じです。</dd>
<dt><strong>zonesdir:</strong> &lt;directory&gt;</dt>
<dd>ゾーンファイルにアクセスする前に、指定したディレクトリに作業ディレクトリを変えます。NSDはこのディレクトリに対する相対パス名で<strong>database</strong>, <strong>zonelistfile</strong>, <strong>logfile</strong>, <strong>pidfile</strong>, <strong>xfrdfile</strong>, <strong>xfrdir</strong>, <strong>server-key-file</strong>, <strong>server-cert-file</strong>, <strong>control-key-file</strong>, <strong>control-cert-file</strong>にアクセスします。作業ディレクトリの変更を無効にするためにはこの値を""（空文字）に設定します。デフォルトでは"<em>/etc/nsd</em>"が使われます。</dd>
<dt><strong>difffile:</strong> &lt;filename&gt;</dt>
<dd>無視されます。NSD3の設定ファイルとの互換性のためです。</dd>
<dt><strong>xfrdfile:</strong> &lt;filename&gt;</dt>
<dd>soaタイムアウトとNSDのゾーン転送デーモンはこのファイルにその状態を保存します。再起動後に状態は読み戻されます。重大な害なしにこの状態ファイルを削除できます。しかし、ゾーンのタイムスタンプは失われます。詳細はNSDのゾーンの期限切れの動作のセクションを参照してください。デフォルトは<em>/var/db/nsd/xfrd.state</em>です。</dd>
<dt><strong>xfrdir:</strong> &lt;directory&gt;</dt>
<dd>ゾーン転送は処理前にここに保存されます。NSDの終了時に削除されるディレクトリがここに生成されます。デフォルトは<em>/tmp</em>です。</dd>
<dt><strong>xfrd-reload-timeout:</strong> &lt;number&gt;</dt>
<dd>この値が-1であれば、xfrdはゾーン転送後のリロードを引き起こしません。正の値であれば、xfrdはゾーン転送後にリロードを行い、それから新しいリロードを行う前に指定した秒数の間待ちます。この値を設定することで、リロードの間隔を指定した秒数毎に一度までに抑制できます。デフォルトは1秒です。</dd>
<dt><strong>verbosity:</strong> &lt;level&gt;</dt>
<dd>この値は（デバッグではない）ログ出力の饒舌さのレベルを指定します。デフォルトは0です。1は内向きの通知とゾーン転送についての情報を与えます。2は遭遇した穏やかな警告の一覧を出力します。</dd>
<dt><strong>hide-version:</strong> &lt;yes or no&gt;</dt>
<dd>CHAOSクラスのクエリーに対してバージョンの文字列をNSDが返答するのを防ぎます。</dd>
<dt><strong>zonefiles-check</strong> &lt;yes or no&gt;</dt>
<dd>NSDに起動時とSIGHUP時にゾーンファイルののmtimeをチェックさせます。無効にすると、（たくさんのゾーンの場合にディスクの動作が減って）より早く起動します。デフォルトは有効です。nsd-control reloadはこのオプションに関係なくゾーンファイルをリロードします。</dd>
<dt><strong>rrl-size:</strong> &lt;numbuckets&gt;</dt>
<dd>このオプションはハッシュテーブルのサイズを指定します。デフォルトは1000000です。より多くのバケットはより多くのメモリを使い、ハッシュ衝突の機会を減らします。</dd>
<dt><strong>rrl-ratelimit:</strong> &lt;qps&gt;</dt>
<dd>（1つのクエリーソースからの）最大qpsが許容されます。デフォルトは200 qpsです。0に設定したら、無効（無制限のレート）になります。ratelimit処理を無効にするには whilelist-ratelimitも0の設定します。verbosityを2に設定すると、制限された、および制限が解除されたサブネットがログ出されます。制限されたクエリーは遮断されたり、TCPフォールバックの回答を受け取ったりします。</dd>
<dt><strong>rrl-slip:</strong> &lt;numpackets&gt;</dt>
<dd>このオプションはSLIP応答（"truncated"ビットをセットした応答）を送り返す前に破棄されるパケットの数を制御します。0はSLIPパケットの送信を無効にし、1は各クエリーがSLIP応答を受け取ることを意味します。</dd>
<dt><strong>rrl-ipv4-prefix-length:</strong> &lt;subnet&gt;</dt>
<dd>IPv4プレフィックス長。アドレスはネットブロックによりグループ化されます。</dd>
<dt><strong>rrl-ipv6-prefix-length:</strong> &lt;subnet&gt;</dt>
<dd>IPv6プレフィックス長。アドレスはネットブロックによりグループ化されます。</dd>
<dt><strong>rrl-whitelist-ratelimit:</strong> &lt;qps&gt;</dt>
<dd>ホワイトリストになるクエリー元の最大qps。デフォルトは2000 qpsです。rrl-whitelistオプションにより、通常の制限の代わりにこのqpsの制限を受け取る特定のクエリー設定できます。0の値を設定すると、レートは無制限になります。</dd>
</dl>

### リモート制御

<p><strong>remote-control:</strong>節は<em>動作中のNSDサーバーにコマンドを与える<a href="../nsd-control/">nsd-control</a></em>(8) ツールを使うためのオプションを設定するために使われます。デフォルトでは無効にされていて、デフォルトでlocalhostで待ち受けます。サーバ－とクライアントの認証に互いに自己署名証明書を使ったTLS over TCPを使います。自己署名証明書は<em>nsd-control-setup</em>ツールで生成することができます。chrootする前およびユーザー権限を落とす前にNSDにより鍵ファイルが読まれます。そのため、chrootの外側に置いたり、スーパーユーザーのみが読むことができるようにしたりできます。</p>
<dl compact="compact">
<dt><strong>control-enable:</strong> &lt;yes or no&gt;</dt>
<dd>リモート制御を有効にします。デフォルトはnoです。</dd>
<dt><strong>control-interface:</strong> &lt;ip4 or ip6&gt;</dt>
<dd>NSDは（TCP上で）制御要求を提供するためにリストされたアドレスにバインドします。複数のIPアドレスにバインドするために複数回記述することができます。ワイルドカードインターフェースでサービスするためには 0.0.0.0 と ::0 を使います。control-enableで制御が有効なときに、このオプションが何も指定されなければ、NSDは制御のために127.0.0.1と::1のインターフェイスで待ち受けます。</dd>
<dt><strong>control-port:</strong> &lt;number&gt;</dt>
<dd>リモート制御サービスのためのポート番号。デフォルトは8952です。</dd>
<dt><strong>server-key-file:</strong> &lt;filename&gt;</dt>
<dd>サーバのプライベート鍵のパスです。デフォルトは<em>/etc/nsd/nsd_server.key</em>です。このファイルは<em>nsd-control-setup</em>ユーティリティにより生成されます。このファイルは<em>nsd-control</em>によってではなくnsdサーバにより使われます。</dd>
<dt><strong>server-cert-file:</strong> &lt;filename&gt;</dt>
<dd>サーバーの自己署名証明書へのパス。デフォルトは<em>/etc/nsd/nsd_server.pem</em>です。このファイルは<em>nsd-control-setup</em>ユーティリティにより生成されます。このファイルはnsdサーバーによっても<em>nsd-control</em>によっても使われます。</dd>
<dt><strong>control-key-file:</strong> &lt;filename&gt;</dt>
<dd>制御クライアントのプライベート鍵へのパス。デフォルトは<em>/etc/nsd/nsd_control.key</em>です。このファイルは<em>nsd-control-setup</em>ユーティリティにより生成されます。このファイルは<em>nsd-control</em>により使われます。</dd>
<dt><strong>control-cert-file:</strong> &lt;filename&gt;</dt>
<dd>制御クライアントの証明書へのパス。デフォルトは<em>/etc/nsd/nsd_control.pem</em>です。この証明書はサーバー証明書により署名されています。このファイルは<em>nsd-control-setup</em>ユーティリティにより生成されます。このファイルは<em>nsd-control</em>により使われます。</dd>
</dl>

### patternオプション

<p><strong>pattern:</strong>節は複数のゾーンに適応するオプションのセットを示すために使われます。ゾーンに関して同じゾーンのオプションは許可されます。</p>
<dl compact="compact">
<dt><strong>name:</strong> &lt;string&gt;</dt>
<dd>パターン名。これは（大文字小文字を区別する）文字列です。"_implicit_"で始まるパターン名はパターンを持たないゾーン（直接nsd.confに定義されたゾーン）の内部で使われます。</dd>
<dt><strong>include-pattern:</strong> &lt;pattern-name&gt;</dt>
<dd>与えられたパターンのオプションはここ場所に読み込まれます。参照されるパターンはこのパターンより上で定義されていなければなりません。</dd>
<dt><strong>&lt;zone option&gt;:</strong> &lt;value&gt;</dt>
<dd><strong>zonefile</strong>, <strong>allow-notify</strong>, <strong>request-xfr</strong>, <strong>allow-axfr-fallback</strong>, <strong>notify</strong>, <strong>notify-retry</strong>, <strong>provide-xfr</strong>, <strong>outgoing-interface</strong>のゾーンオプションがで指定できます。これらはこのパターンに読み込まれるパターンとゾーンに適応されます。</dd>
</dl>

### ゾーン オプション

<p>ゾーン毎に一つの<strong>zone:</strong>節で指定されるオプションが必要です。複数のサーバーを加えるためにはアクセス制御リストの要素を複数回与えます。これらの要素は明示的に追加される必要があります。</p>
<p><em>nsd.conf</em>設定ファイルに設定されたゾーンは、（それ自体の暗黙的なパターンないで）その設定がハードコードされます。そして、それらはdelzoneで削除できませんが、設定ファイルから削除したり、repatternで削除したりすることはできます。 </p>
<dl compact="compact">
<dt><strong>name:</strong> &lt;string&gt;</dt>
<dd>ゾーン名。これはゾーンの頂点のドメイン名です。（FQDN記法で）'.'で終わってもよいです。例えば、"example.com",や"sub.example.net."です。この属性は各ゾーンに存在しなければなりません。</dd>
<dt><strong>zonefile:</strong> &lt;filename&gt;</dt>
<dd>ゾーン情報を含んでいるファイル。この属性が存在していたら、指定したファイルはゾーンの内容を読み書きするのに使われます。この属性が存在していなければ、そのゾーンを書き出すことを防ぎます。</dd>
<dt><strong>allow-notify:</strong> &lt;ip-spec&gt; &lt;key-name | NOKEY | BLOCKED&gt;</dt>
<dd>アクセス制御リスト。指定された（プライマリ サーバの）アドレスはこの（セカンダリ）サーバに通知を送信するのが許可されます。指定されていない、あるいはBLOCKEDと指定されたアドレスからの通知は破棄されます。NOKEYが与えられたら、TSIG署名は必要とされません。BLOCKEDは他のエントリーを破棄します。他のエントリーは記述の順番で一致するかを調べられます。
<dl compact="compact">
<dd>ip-specは普通のIPアドレス（IPv4やIPv6）、あるいは1.2.3.4/24の形式のサブネット、1.2.3.4&amp;255.255.255.0のようなマスクされたもの、1.2.3.4-1.2.3.25の形式の範囲のどれかです。ポート番号は@numberの接尾語を使って付与されます。例えば、5300番ポートでは1.2.3.4@5300や1.2.3.4/24@5300です。ip-specの範囲は/や&amp;や@や-記号の周りに空白を使ってはいけません。</dd>
</dl>
</dd>
<dt><strong>request-xfr:</strong> [AXFR|UDP] &lt;ip-address&gt; &lt;key-name | NOKEY&gt;</dt>
<dd>アクセス制御リスト。指定した（マスタ サーバの）アドレスに更新時にAXFR/IXFRのクエリーを行います。ポート番号は@numberの接尾語を使って付与されます。例えば、5300番ポートでは1.2.3.4@5300です。指定した鍵がAXFR/IXFRで使われす。
<dl compact="compact">
<dd>AXFRオプションが与えられたら、そのサーバにはIXFRクエリーで接続されず、AXFR要求のみが行われます。これはNSDセカンダリがNSDを動かすマスタ サーバを持つことを許可します。AXFRオプションがなければ、IXFRとAXFR要求の両方がマスタ サーバに行われます。UDPオプションが与えられたら、セカンダリはIXFR要求を送信するためにUDPを使います。UDP送信を許可するときには、通知とゾーン転送を認証するために、TSIGを設定するべきです。そうでなければ、NSDはKaminsky方式の攻撃でもっと脆弱になるでしょう。UDPオプションがなければ、IXFRはTCPを使って送信されます。</dd>
</dl>
</dd>
<dt><strong>allow-axfr-fallback:</strong> &lt;yes or no&gt;</dt>
<dd>このオプションはrequest-xfrオプションと一緒に使われるべきです。プライマリ ネームサーバがIXFRをサポートしていないときに、（セカンダリとしての）NSDがAXFRにフォールバックするのを許可あるいは拒否します。デフォルトではyesです。</dd>
<dt><strong>notify:</strong> &lt;ip-address&gt; &lt;key-name | NOKEY&gt;</dt>
<dd>アクセス制御リスト。指定した（セカンダリ サーバの）アドレスはこのゾーンへの更新が通知されます。ポート番号は@numberの接尾語を使って付与されます。例えば、5300番ポートでは1.2.3.4@5300です。指定した鍵は通知を署名するために使われます。セカンダリの設定上でのみ、（自身に通知させたり、しばらくして更新したりして）NSDはゾーンの更新を検出できます。</dd>
<dt><strong>notify-retry:</strong> &lt;number&gt;</dt>
<dd>このオプションはnotifyオプションと一緒に使われるべきです。通知の送信時の再接続の試みの回数を設定します。</dd>
<dt><strong>provide-xfr:</strong> &lt;ip-spec&gt; &lt;key-name | NOKEY | BLOCKED&gt;</dt>
<dd>アクセス制御リスト。指定した（セカンダリ サーバの）アドレスはこのサーバからのAXFRの要求を許可されます。ゾーン データはそのアドレス宛に提供されます。指定した鍵がAXFRで使われす。指定されていない、あるいはBLOCKEDと指定されたアドレスでは、データは提供されず、要求は破棄されます。BLOCKEDは他のエントリーを破棄します。他のエントリーは記述の順番で一致するかを調べられます。
<dl compact="compact">
<dd>ip-specは普通のIPアドレス（IPv4やIPv6）、あるいは1.2.3.4/24の形式のサブネット、1.2.3.4&amp;255.255.255.0のようなマスクされたもの、1.2.3.4-1.2.3.25の形式の範囲のどれかです。ポート番号は@numberの接尾語を使って付与されます。例えば、5300番ポートでは1.2.3.4@5300や1.2.3.4/24@5300です。ip-specの範囲は/や&amp;や@や-記号の周りに空白を使ってはいけません。</dd>
</dl>
</dd>
<dt><strong>outgoing-interface:</strong> &lt;ip-address&gt;</dt>
<dd>アクセス制御リスト。指定したアドレスは（セカンダリの場合では）AXFR|IXFRを要求するために使われるか、（プライマリの場合では）通知を送信するために使われます。
<dl compact="compact">
<dd>IPアドレスは普通のIPアドレス（IPv4またはIPv6）です。ポート番号は@numberの接尾語を使って付与されます。例えば、5300番ポートでは1.2.3.4@5300です。</dd>
</dl>
</dd>
<dt><strong>include-pattern:</strong> &lt;pattern-name&gt;</dt>
<dd>与えられたパターンのオプションはここ場所に読み込まれます。参照されるパターンはこのゾーンより上で定義されていなければなりません。</dd>
<dt><strong>rrl-whitelist:</strong> &lt;rrltype&gt;</dt>
<dd>このオプションの節はこのゾーンのための指定したrrltypeのクエリーがホワイトリストされるようになります。これらはwhitelist-ratelimitを受け入れます。複数行を記述したら、各行はゾーンのためにホワイトリストされる新しいrrltypeを有効にします。デフォルトは何もホワイトリストされません。rrltypeはNSD RRLが異なるタイプを互いに干渉させないように利用するクエリーの分類です。（verbosity 2では）サブネットがブロックされるときに、タイプがログの行に出力されます。RRLの分類タイプはnxdomain, error, referral, any, rrsig, wildcard, nodata, dnskey, positive, allです。</dd>
</dl>

### 鍵の宣言

<p><strong>key:</strong>節はアクセス制御リストで使われる鍵を設定します。次の属性を持ちます。</p>
<dl compact="compact">
<dt><strong>name:</strong> &lt;string&gt;</dt>
<dd>鍵の名前。アクセス制御リストでこの鍵を参照するために使われます。</dd>
<dt><strong>algorithm:</strong> &lt;string&gt;</dt>
<dd>この鍵の認証アルゴリズム。</dd>
<dt><strong>secret:</strong> &lt;base64 blob&gt;</dt>
<dd>base64で符号化された共有鍵。異なるファイルに<strong>secret:</strong>宣言（とbase64の塊）を置くこともできます。このときは<strong>include:</strong>でそのファイルを指定します。このようにして、鍵と設定ファイルの残りは異なるセキュリティ ポリシーを持つこともあるため、別ファイルに分けることができます。</dd>
</dl>

## BIND9ハッカーのためのNSDの設定

<p>BIND9は自身の設定ファイルの形式named.conf(5)を持つネームサーバの実装です。BIND9には'Master'と'Slave'のタイプのゾーンがあります。</p>

### スレーブ ゾーン

<p>スレーブ ゾーンでは、マスタ サーバが並べられます。マスタ サーバはゾーン データをクエリーされ、更新通知のために待ち受けます。NSDでは、これらの2つの特性は別に設定される必要があります。allow-notifyとrequest-xfrオプションでマスタ アドレスを並べます。BIND9では、（例えば操作者など）通知の特別な送信元のためにallow-notify要素を提供することだけが必要です。NSDはマスタと操作者の両方のためにallow-notifyを持つ必要があります。BIND9では追加の転送元を許可します。NSDでは、request-xfrとして転送元を並べます。BIND9の文法でスレーブ ゾーンの例をここに示します。# Config file for example.org options {</p>
<dl compact="compact">
<dd>dnssec-enable yes;</dd>
</dl>
<dl compact="compact">
<dd>};</dd>
</dl>
<p>key tsig.example.org. {</p>
<dl compact="compact">
<dd>algorithm hmac-md5;</dd>
</dl>
<dl compact="compact">
<dd>secret "aaaaaabbbbbbccccccdddddd";</dd>
</dl>

};

<p>server 162.0.4.49 {</p>
<dl compact="compact">
<dd>keys { tsig.example.org. ; };</dd>
</dl>

};

<p>zone "example.org" {</p>
<dl compact="compact">
<dd>type slave;</dd>
</dl>
<dl compact="compact">
<dd>file "secondary/example.org.signed";</dd>
</dl>
<dl compact="compact">
<dd>masters { 162.0.4.49; };</dd>
</dl>
}; For NSD, DNSSEC is enabled automatically for zones that are signed. options節にdnssec-enable文は必要ではありません。NSDでは、鍵はアクセス制御リストの文のIPアドレスと結びつけられています。そのため、server{}文は必要ありません。NSDの設定ファイルでは同じ例は下のようになります。
<p># Config file for example.org</p>
<dl compact="compact">
<dd>key:</dd>
</dl>
<dl compact="compact">
<dd>name: tsig.example.org.</dd>
</dl>
<dl compact="compact">
<dd>algorithm: hmac-md5</dd>
</dl>
<dl compact="compact">
<dd>secret: "aaaaaabbbbbbccccccdddddd"</dd>
</dl>
<p>zone:</p>
<dl compact="compact">
<dd>name: "example.org"</dd>
</dl>
<dl compact="compact">
<dd>zonefile: "secondary/example.org.signed"</dd>
</dl>
<dl compact="compact">
<dd># the master is allowed to notify and will provide zone data.</dd>
</dl>
<dl compact="compact">
<dd>allow-notify: 162.0.4.49 NOKEY</dd>
</dl>
<dl compact="compact">
<dd>request-xfr: 162.0.4.49 tsig.example.org.</dd>
</dl>
masterは2回並べられていることに注目してください。このスレーブ サーバに通知を送ることを許可するために1回、スレーブ サーバに更新のゾーン データがどこにあるかを伝えるために1回。マスタを指定するために、もっと多くのallow-notifyとrequest-xfrの行を追加することができます。このスレーブ サーバに通知を送信することも許可するアドレスのために、追加のallow-notifyの行を指定することができます。

### マスタ ゾーン

<p>BIND9でのマスタ ゾーンでは、スレーブ サーバが並べられます。これらのスレーブ サーバは更新の通知を送信され、ゾーン データの転送の要求を許可されます。NSDでは、これらの2つの特性は別に設定される必要があります。BIND9の文法でマスタ ゾーンの例をここに示します。</p>
<p>zone "example.nl" {</p>
<dl compact="compact">
<dd>type master;</dd>
</dl>
<dl compact="compact">
<dd>file "example.nl";</dd>
</dl>

};

<p>NSDの文法ではこれは次のようになります。</p>
<p>zone:</p>
<dl compact="compact">
<dd>name: "example.nl"</dd>
</dl>
<dl compact="compact">
<dd>zonefile: "example.nl"</dd>
</dl>
<dl compact="compact">
<dd># allow anybody to request xfr.</dd>
</dl>
<dl compact="compact">
<dd>provide-xfr: 0.0.0.0/0 NOKEY</dd>
</dl>
<dl compact="compact">
<dd>provide-xfr: ::0/0 NOKEY</dd>
</dl>
<dl compact="compact">
<dd># to list a slave server you would in general give</dd>
</dl>
<dl compact="compact">
<dd># provide-xfr: 1.2.3.4 tsig-key.name.</dd>
</dl>
<dl compact="compact">
<dd># notify: 1.2.3.4 NOKEY</dd>
</dl>

### その他

<p>NSDは権威のみのDNSサーバです。これはゾーンのプライマリあるいはセカンダリのサーバとして意味し、DNSリゾルバとキャッシュにDNSデータを提供します。BIND9は権威サーバとして機能し、その設定オプションはこのセクションのNSDと比べられます。しかし、BIND9はリゾルバやキャッシュとしても機能します。BIND9がリゾルバやキャッシュのために持つ設定オプションはNSDと等しくないです。</p>

## ファイル

<dl compact="compact">
<dt>/var/db/nsd/nsd.db</dt>
<dd>デフォルトの<strong>NSD</strong>データベース</dd>
<dt>/etc/nsd/nsd.conf</dt>
<dd>デフォルトの<strong>NSD</strong>の設定ファイル</dd>
</dl>

## 関連項目

<p><em><a href="../nsd/">nsd</a></em>(8), <em><a href="../nsd-checkconf/">nsd-checkconf</a></em>(8), <em><a href="../nsd-control/">nsd-control</a></em>(8)</p>

## 著者

<p><strong>NSD</strong>はNLnet LabsとRIPE NCCの共同チームにより作られました。詳細は配布ファイルに含まれているファイルCREDITSを見てください。</p>

## バグ

<p><strong>nsd.conf</strong>は基本的な解析器により解析されます。エラーメッセージは要領を得ないかもしれません。</p>
<hr />
