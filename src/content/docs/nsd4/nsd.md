---
title: nsd(8)
---
<h1>NSD</h1>

Section: NSD 4.0.0 (8)<br />
Updated: Oct 29, 2013<br />
<hr />
<h2>名前</h2>
<p><strong>nsd</strong> - Name Server Daemon (NSD) version 4.0.0.</p>
<h2>書式</h2>
<p><strong>nsd</strong> [<strong>-4</strong>] [<strong>-6</strong>] [<strong>-a</strong> <em>ip-address[@port]</em>] [<strong>-c</strong> <em>configfile</em>] [<strong>-d</strong>] [<strong>-f</strong> <em>database</em>] [<strong>-h</strong>] [<strong>-i</strong> <em>identity</em>] [<strong>-I</strong> <em>nsid</em>] [<strong>-l</strong> <em>logfile</em>] [<strong>-N</strong> <em>server-count</em>] [<strong>-n</strong> <em>noncurrent-tcp-count</em>] [<strong>-P</strong> <em>pidfile</em>] [<strong>-p</strong> <em>port</em>] [<strong>-s</strong> <em>seconds</em>] [<strong>-t</strong> <em>chrootdir</em>] [<strong>-u</strong> <em>username</em>] [<strong>-V</strong> <em>level</em>] [<strong>-v</strong>]</p>
<h2>説明</h2>
<p><strong>NSD</strong>は権威DNSネームサーバの完全な実装です。起動時に、<strong>NSD</strong>は引数<strong>-f</strong> <em>database</em>で指定されたデータベースを読み込み、バックグラウンドに移り、53番ポートか<strong>-p</strong> <em>port</em>オプションで指定された異なるポート番号でクエリーに答えます。<em>database</em> が存在しなければ作成されます。デフォルトでは、<strong>NSD</strong>利用できるすべてのローカルインターフェイスにバインドします。<strong>-a</strong> <em>ip-address[@port]</em>オプションを使うと、バインドされる特定のインターフェイスを指定することができます。このオプションを1回以上使うと、<strong>NSD</strong>指定したすべてのIPアドレスを個別にUDPとTCPのソケットにバインドします。<strong>NSD</strong>のコンパイル時にIPv6を有効にしていれば、IPv6アドレスも指定できます。</p>
<h2>オプション</h2>
<p><strong>-v</strong>と<strong>-h</strong>オプションを除いて、全てのオプションは設定ファイル（<strong>-c</strong> 引数）で指定できます。オプションがコマンドラインで指定されたら、コマンドラインのオプションは設定ファイルのオプションより優先されます。通常は、<strong>NSD</strong>は オペレーションシステムの起動時に<em>/etc/rc.d/nsd.sh</em>スクリプトのようなものから実行される`<a href="../nsd-control/">nsd-control</a>(8) start`から起動されるべきです。</p>
<dl compact="compact">
<dt><strong>-4</strong></dt>
<dd>IPv4の接続のみを待ち受けます。</dd>
<dt><strong>-6</strong></dt>
<dd>IPv6の接続のみを待ち受けます。</dd>
<dt><strong>-a</strong> <em>ip-address[@port]</em></dt>
<dd>指定した<em>ip-address</em>で待ち受けます。<em>ip-address</em>は（標準のIPv4やIPv6の記法を使った）数値形式で指定します。任意で、ポート番号を記述することもできます。このオプションは複数のIPアドレスで待ち受けるために複数回指定できます。このオプションが指定されなかったら、<strong>NSD</strong>はワイルドカード インターフェースで待ち受けます。</dd>
<dt><strong>-c</strong> <em>configfile</em></dt>
<dd>デフォルトの設定ファイル<em>/etc/nsd/nsd.conf</em>の代わりに指定した設定ファイル<em>configfile</em>を読み込みます。形式の記述については、<a href="../nsd.conf/">nsd.conf</a>(5)を参照してください。</dd>
<dt><strong>-d</strong></dt>
<dd>フォークせずに、フォアグランドに留まります。</dd>
<dt><strong>-f</strong> <em>database</em></dt>
<dd> デフォルトのデータベース<em>/var/db/nsd/nsd.db</em>の代わりに指定したデータベース<em>database</em>を使います。設定ファイルに<strong>zonesdir:</strong>が指定されていれば、このパスはそのディレクトリからの相対パスになります。</dd>
<dt><strong>-h</strong></dt>
<dd>ヘルプを出力して、終了します。</dd>
<dt><strong>-i</strong> <em>identity</em></dt>
<dd><em>CH TXT ID.SERVER</em>を尋ねられたときに指定した<em>identity</em>を返します（このオプションはエニーキャストの構成のときにそのクエリーにどのサーバーが答えているかを決めるために使われます）。デフォルトは<a href="../gethostname/">gethostname</a>(3)により返される名前です。</dd>
<dt><strong>-I</strong> <em>nsid</em></dt>
<dd>NSID EDNS有効パケットでクエリーが行われたときに回答のEDNSセクションに指定した<em>nsid</em>を追加します。</dd>
<dt><strong>-l</strong> <em>logfile</em></dt>
<dd>指定した<em>logfile</em>にメッセージのログを記録します。デフォルトは標準エラーとsyslogにログを記録します。設定ファイルに<strong>zonesdir:</strong>が指定されていれば、このパスはそのディレクトリに対する相対パスになります。</dd>
<dt><strong>-N</strong> <em>count</em></dt>
<dd>指定した数の<strong>NSD</strong>サーバを開始します。デフォルトは1です。複数のサーバーで開始するのは、複数のCPUやネットワーク アダプターのあるマシンでのみ役に立ちます。</dd>
<dt><strong>-n</strong> <em>number</em></dt>
<dd>各サーバで処理できる最大同時TCP接続数。デフォルトは100です。</dd>
<dt><strong>-P</strong> <em>pidfile</em></dt>
<dd>プラットフォーム特有のデフォルトのPIDファイル（大抵は<em>/var/run/nsd.pid</em>）の代わりに指定したPIDファイルを使います。設定ファイルに<strong>zonesdir:</strong>が指定されていれば、このパスはそのディレクトリに対する相対パスになります。</dd>
<dt><strong>-p</strong> <em>port</em></dt>
<dd>指定したポート番号でクエリーに回答します。通常は、これは53番ポートです。</dd>
<dt><strong>-s</strong> <em>seconds</em></dt>
<dd>指定した秒毎に統計情報のダンプを生成します。これは定期的にデーモンに<em>SIGUSR1</em>を送ることに等しいです。</dd>
<dt><strong>-t</strong> <em>chroot</em></dt>
<dd>起動時に<em>chroot</em>するディレクトリを指定します。このオプションはsyslogd(8)ソケット（例えば<em>chrootdir</em> /dev/log）が利用できるようにする必要があります。そうでなければ、<strong>NSD</strong>は何もログを出力できません。</dd>
<dt><strong>-u</strong> <em>username</em></dt>
<dd>ソケットにバインドした後にユーザーとグループの権限をユーザー<em>username</em>の権限に落とします。<em>username</em>はユーザー名かidかid.gidのどれかでなければなりません。例えば、nsdや80や80.80です。</dd>
<dt><strong>-V</strong> <em>level</em></dt>
<dd>この値は（デバッグではない）ログ出力の饒舌さのレベルを指定します。デフォルトは0です。</dd>
<dt><strong>-v</strong></dt>
<dd>標準エラーに<strong>NSD</strong>のバージョン番号を出力して、終了します。</dd>
</dl>
<p><strong>NSD</strong>は以下に示すシグナルに反応します:</p>
<dl compact="compact">
<dt>SIGTERM</dt>
<dd>クエリーへの回答を止め、シャットダウンし、正常終了します。</dd>
<dt>SIGHUP</dt>
<dd>リロードします。ゾーンファイルをスキャンし、 mtimeが変更されていればそれを読み込みます。ログファイルも再オープンします。これはログローテーションを助けます。</dd>
<dt>SIGUSR1</dt>
<dd>ログにBIND8形式の統計情報をダンプします。他のシグナルは無視されます。</dd>
</dl>
<h2>ファイル</h2>
<dl compact="compact">
<dt>/var/db/nsd/nsd.db</dt>
<dd>デフォルトの<strong>NSD</strong>データベース</dd>
<dt>/var/run/nsd.pid</dt>
<dd>ネームサーバのプロセスID</dd>
<dt>/etc/nsd/nsd.conf</dt>
<dd>デフォルトの<strong>NSD</strong>の設定ファイル</dd>
</dl>
<h2>診断</h2>
<p><strong>-d</strong>オプションが指定されていなければ、標準のsyslog(8)の<em>daemon</em>ファシリティで全ての問題が記録されます。</p>
<h2>関連項目</h2>
<p><em><a href="../nsd.conf/">nsd.conf</a></em>(5), <em><a href="../nsd-checkconf/">nsd-checkconf</a></em>(8), <em><a href="../nsd-control/">nsd-control</a></em>(8)</p>
<h2>著者</h2>
<p><strong>NSD</strong>はNLnet LabsとRIPE NCCの共同チームにより作られました。詳細は配布ファイルに含まれているファイルCREDITSを見てください。</p>
<hr />
