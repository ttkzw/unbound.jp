---
title: unbound.conf(5)
---
<h1>unbound.conf</h1>
<p>Section: unbound 1.4.17 (5)<br />
Updated: May 24, 2012<br /></p>
<hr />
<h2>名前</h2>
<p><strong>unbound.conf</strong> - Unbound設定ファイル</p>
<h2>書式</h2>
<p><strong>unbound.conf</strong></p>
<h2>説明</h2>
<p><strong>unbound.conf</strong>は<em><a href="../unbound/">unbound</a></em>(8)の設定ファイルです。このファイル形式は属性と値を持ちます。属性の内側に属性を持つものもあります。記述方法は"属性: 値"です。</p>
<p>コメントは#から行の終わりまです。空行も行の先頭の空白も無視されます。</p>
<p><em><a href="../unbound-checkconf/">unbound-checkconf</a></em>(8)というユーティリティは利用前にunbound.confをチェックするために利用できます。</p>
<h2>例</h2>
<p>設定ファイルの例を以下に示します。設定ファイルの内容を/etc/unbound/unbound.confにコピーして、次のコマンドでサーバー起動します。</p>
<pre>
        $ unbound -c /etc/unbound/unbound.conf 
</pre>
<p>ほとんどの設定はデフォルトのままです。次のコマンドでサーバーを停止します。</p>
<pre>
        $ kill `cat /etc/unbound/unbound.pid`
</pre>
<p>最小の設定ファイルは次の通りです。ソースコードの配布物には全てのオプションを記述してあるexample.confを含んでいます。</p>
<pre>
# <a href="../unbound.conf/">unbound.conf</a>(5) config file for <a href="../unbound/">unbound</a>(8)
server:
        directory: "/etc/unbound"
        username: unbound
        # make sure unbound can access entropy from inside the chroot
        # e.g. on linux the use these commands (on BSD, <a href="../devfs/">devfs</a>(8) is used)
        #      mount --bind -n /dev/random /etc/unbound/dev/random
        # and  mount --bind -n /dev/log /etc/unbound/dev/log
        chroot: "/etc/unbound"
        # logfile: "/etc/unbound/unbound.log"  #uncomment to use logfile
        pidfile: "/etc/unbound/unbound.pid"
        # verbosity: 1          # uncomment and increase to get more logging
        # listen on all interfaces, answer queries from the local subnet
        interface: 0.0.0.0
        interface: ::0
        access-control: 10.0.0.0/8 allow
        access-control: 2001:DB8::/64 allow
</pre>
<h2>ファイル形式</h2>
<p>キーワード間には空白が必要です。属性のキーワードはコロン':'で終わります。属性の次には属性あるいは値が続きます。</p>
<p><strong>include:</strong>ディレクティブを使ってファイルを取り込むことができます。これはどこでも記述することができ、引数に一つのファイル名を取ります。取り込んだファイルのテキストはその箇所で設定ファイルにコピーされたような処理を行います。chrootを使っていても、取り込まれたファイルのフルパス名を使って動作し、デーモンが起動したディレクトリがchrootあるいは作業ディレクトリであれば取り込まれたファイルの相対パス名でも動作します。</p>
<h3>サーバーのオプション</h3>
<p>以下のオプションは<strong>server:</strong>節に記述します。</p>
<dl compact="compact">
<dt><strong>verbosity:</strong> <em>&lt;number&gt;</em></dt>
<dd>饒舌さの数。レベル0は饒舌さなしで、エラーのみ。レベル1は操作情報。レベル2は詳細な操作情報。レベル3はクエリーレベルの情報についてクエリー毎の出力。レベル4はアルゴリズムレベルの情報。レベル5はキャッシュミスのクライアントの識別を記録します。デフォルトは1です。verbosityはコマンドラインのオプションで増やすこともできます。<em><a href="../unbound/">unbound</a></em>(8)を参照してください。</dd>
<dt><strong>statistics-interval:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>スレッド毎にログに統計情報を出力する間隔の秒数。値0あるいは""で無効になります。デフォルトでは無効です。統計出力の間隔の間に回答が送られた場合のみ度数分布の統計が出力されます。要求一覧の統計は間隔毎（0でもよい）に出力されます。これは中央値計算が存在するデータを要求するためです。</dd>
<dt><strong>statistics-cumulative:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>有効にすると、統計を出力した後に統計のカウンターをクリアせずに、unboundを起動してからの情報情報を累積します。デフォルトはnoです。</dd>
<dt><strong>extended-statistics:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>有効にすると、拡張された統計が<em><a href="../unbound-control/">unbound-control</a></em>(8)から出力されます。デフォルトはオフです。これは統計を追跡するのに時間がかかるためです。カウンターは<em><a href="../unbound-control/">unbound-control</a></em>(8)で列挙されます。</dd>
<dt><strong>num-threads:</strong> <em>&lt;number&gt;</em></dt>
<dd>クライアントに提供するために生成するスレッド数。スレッドを使わないときには1を使います。</dd>
<dt><strong>port:</strong> <em>&lt;port number&gt;</em></dt>
<dd>サーバーがクエリーに応答するポート番号。デフォルト:53。</dd>
<dt><strong>interface:</strong> <em>&lt;ip address[@port]&gt;</em></dt>
<dd>ネットワークへの接続に使用するインターフェース。このインターフェースはクライアントからのクエリーのためにリッスンされ、クライアントへの回答をこのインターフェースから送ります。複数のインターフェースで動くように、このオプションを複数記述することができます。指定がない場合は、デフォルトではlocalhostでリッスンするようになります。インターフェースはリロード（kill -HUP）では変更が反映しません。再起動してください。（インターフェースとポート番号の間には空白なしで）ポート番号は@ポートで指定できます。指定されないときにはデフォルトのポート番号（<strong>port</strong>）が使われます</dd>
<dt><strong>interface-automatic:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>UDPクエリーのソース インターフェースを検出し、応答にそのインターフェースをコピーして利用します。この機能は実験的で、あなたのOSが固有のソケット オプションをサポートしている必要があります。デフォルト値はnoです。</dd>
<dt><strong>outgoing-interface:</strong> <em>&lt;ip address&gt;</em></dt>
<dd>ネットワークへの接続に使用するインターフェース。このインターフェースは権威サーバーにクエリーを送信し、その応答を受信するために使用されます。複数のインターフェースで動くように、このオプションを複数記述することができます。何も指定がないときには、デフォルト（all）が使用されます。<strong>interface:</strong>と<strong>outgoing-interface:</strong>の行で同じインターフェースを指定することができます。そのときには、インターフェースは両方の目的で使用できます。スプーフィングを防ぐために、ランダムに選ばれた外向きのインターフェースから外向きのクエリーは送信されます。</dd>
<dt><strong>outgoing-range:</strong> <em>&lt;number&gt;</em></dt>
<dd>オープンするポートの数。このファイル記述子の数はスレッド毎にオープンされます。1以上でなければなりません。デフォルト値はコンパイルオプションに依存します。大きい数を指定するとOSから余分なリソースを必要とします。性能のために、大きな値が最もよいです。これを可能にするためにはlibeventを使います。</dd>
<dt><strong>outgoing-port-permit:</strong> <em>&lt;port number or range&gt;</em></dt>
<dd>クエリーの送信に利用するポート番号あるいはポート番号の範囲をオープンするのを許可します。たくさんの外向きのポートはスプーフィングの試みへの耐性を増やします。このポート番号が他のデーモンに必要とされないようにしてください。デフォルトではIANAにより割り当てられていない1024より大きいポート番号のみが使われます。ポート番号あるいは空白なしの"低い値-高い値"の形式で範囲を指定します。</dd>
<dd><strong>outgoing-port-permit</strong>と<strong>outgoing-port-avoid</strong>は設定ファイルに行の順番に処理され、許可されたポート番号を追加したり、許可されたポート番号の集まりから避けるポート番号を差し引いたりします。許可されるポート番号の集まりの中で1024より大きいIANAにより割り当てられていないポート番号で処理は始まります。</dd>
<dt><strong>outgoing-port-avoid:</strong> <em>&lt;port number or range&gt;</em></dt>
<dd>クエリーを送信するのに使用するポート番号あるいはポート番号の範囲でunboundがオープンするのを許可しません。他のデーモンが必要とするポート番号をunboundが使用しないようするためにこれを使います。このポート番号はすべての外向きのインターフェースのIPv4とIPv6ともに避けられます。デフォルトではIANAにより割り当てられていない1024より大きいポート番号のみが使われます。ポート番号あるいは空白なしの"低い値-高い値"の形式で範囲を指定します。</dd>
<dt><strong>outgoing-num-tcp:</strong> <em>&lt;number&gt;</em></dt>
<dd>スレッド毎に割り当てる外向きのTCPバッファの数。デフォルトは10です。0が設定されたら、あるいはdo_tcpが"no"であれば、権威サーバーへのTCPクエリーは行われません。</dd>
<dt><strong>incoming-num-tcp:</strong> <em>&lt;number&gt;</em></dt>
<dd>スレッド毎に割り当てる内向きのTCPバッファの数。デフォルトは10です。0が設定されたら、あるいはdo_tcpが"no"であれば、クライアントからのTCPクエリーは受け付けません。</dd>
<dt><strong>edns-buffer-size:</strong> <em>&lt;number&gt;</em> (1.4.0-)</dt>
<dd>EDNSの再組み立てバッファーサイズとして広告するバイトサイズ数です。これは、相手に向かったUDPの上でデータグラムに入れられた値です。実際のバッファーサイズは（TCPもUDPも両方とも）msg-buffer-sizeにより決められます。その値より低い値を設定してはいけません。デフォルトはRFCで推奨されている4096です。フラグメンテーション再組み立て問題が起きたら、大抵はタイムアウトとして現れます。そのとき、1480の値がその問題を解決します。512に設定するのは、最も厳しいパスMTU問題さえ迂回させますが、同じくらい極端な状態に見えます。発生するTCPフォールバックの量が過剰になるので(たぶんこのリゾルバに関しても、外向けのTCP数を調整すると考えてください)。</dd>
<dt><strong>msg-buffer-size:</strong> <em>&lt;number&gt;</em></dt>
<dd>メッセージ バッファのバイトサイズ数。デフォルトは65552バイトです。この値はDNSの最大メッセージサイズである64Kbのパケットを処理するには十分なものです。これより大きいメッセージを送受信することはありえません。使用するメモリを少なくするために減らすこともできます。しかし、大きいリソースレコードを求めるDNSデータのリクエストでは、クライアントへの応答がSERVFAILの結果になります。</dd>
<dt><strong>msg-cache-size:</strong> <em>&lt;number&gt;</em></dt>
<dd>メッセージ キャッシュのバイトサイズ数。デフォルトは4メガバイトです。数字だけの時はバイトです。キロバイト、メガバイト、ギガバイトのときには数字の後ろに'k'、'm'、'g'を追加します。なお、メガバイトは1024*1024バイトです。</dd>
<dt><strong>msg-cache-slabs:</strong> <em>&lt;number&gt;</em></dt>
<dd>メッセージ キャッシュ内のスラブ数。スラブはスレッドによるロックの競合を減らします。値は2の累乗に設定してください。CPUの数（に近い値）に設定することは理にかなっています。</dd>
<dt><strong>num-queries-per-thread:</strong> <em>&lt;number&gt;</em></dt>
<dd>スレッド毎に同時に対応できるクエリーの数。サービスを必要とするクエリーの数がこれより多く達したら、クエリーは押し出されず(<em>jostle-timeout</em>を参照)、それから、クエリーは落とされます。このときにはクライアントにタイムアウト後に再送させます。存在しているクエリーを処理することにサーバーの時間を割り当てます。デフォルト値はコンパイルオプションに依存します。512か1024です。</dd>
<dt><strong>jostle-timeout:</strong> <em>&lt;msec&gt;</em></dt>
<dd>サーバーが非常に混んでいるときにタイムアウトが使われます。権威サーバーへの1回の往復になる値に通常は設定します。非常に多くのクエリーが届いたときには、クエリーの50%は実行することが許可されます。残りの50%は、許可された時間以上の時間を費やしていれば新しく来たクエリーに置き換えられます。これは遅いクエリーや非常に高い頻度のクエリーによるサービス不能攻撃に対して防ぎます。デフォルトは200ミリ秒です。その効果は長く続いているクエリーのqpsが約（スレッド毎のクエリー数/2）/（長いクエリーの平均値）qpsになります。短いクエリーのqpsはスレッド毎のおおよそ（スレッド毎のクエリー数/2）/（jostletimeout）qpsであり、デフォルトで約(1024/2)*5 = 2560 qpsになります。</dd>
<dt><strong>so-rcvbuf:</strong> <em>&lt;number&gt;</em> (1.4.0-)</dt>
<dd>0でない場合は、UDPポート53の内向きクエリー上でより多くのバッファ空間を得るためにSO_RCVBUFソケット オプションを設定します。忙しいサーバーでの短い高負荷でもパケットを落とさないように（netstat -suでのカウンターをみてください）。デフォルトは0です。システム値を使ってください。そうでなければ、バイト数を調べるために、忙しいサーバーで"4m"を試してください。OSは最大値で上限をかけます。Linux上ではunboundはその制限を回避するためにroot権限を必要とします。あるいは管理者はsysctl net.core.rmem_maxを使うことができます。BSDでは、/etc/sysct.confでkern.ipc.maxsockbufを変えます。OpenBSDではヘッダを変え、カーネルを再コンパイルします。Solarisではndd -set /dev/udp udp_max_buf 8388608を行います。</dd>
<dt><strong>so-sndbuf:</strong> <em>&lt;number&gt;</em> (1.4.8-)</dt>
<dd>0でない場合は、UDPポート53の外向きクエリー上でより多くのバッファ空間を得るためにSO_SNDBUFソケット オプションを設定します。非常に忙しいサーバーのためにこれは回答のトラフィックの高負荷を処理します。そうでなければ、 'send: resource temporarily unavailable'がログに記録されます。バッファ オーバーランはnetstat -suでも見ることができます。デフォルトは0です。システム値を使ってください。バイト数を調べるために、忙しいサーバーで"4m"を試してください。OSは最大値で上限をかけます。Linux上ではunboundはその制限を回避するためにroot権限を必要とします。あるいは管理者はsysctl net.core.wmem_maxを使うことができます。BSDとSolarisでの変更はso-rcvbufと似ています。</dd>
<dt><strong>rrset-cache-size:</strong> <em>&lt;number&gt;</em></dt>
<dd>RRsetキャッシュのバイトサイズ数。デフォルトは4メガバイトです。数字だけの時はバイトです。キロバイト、メガバイト、ギガバイトのときには数字の後ろに'k'、'm'、'g'を追加します。なお、メガバイトは1024*1024バイトです。</dd>
<dt><strong>rrset-cache-slabs:</strong> <em>&lt;number&gt;</em></dt>
<dd>RRsetキャッシュ内のスラブ数。スラブはスレッドによるロックの競合を減らします。値は2の累乗に設定してください。</dd>
<dt><strong>cache-max-ttl:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>キャッシュ内のRRsetとメッセージの生存期間（TTL）の最大値。デフォルトは86400秒（1日）です。最大値になるまで、クライアントへの応答はオリジナルの（より大きい）値に基づいたTTLを減らしていきます。内部のTTLが期限切れしたら、キャッシュしているデータは期限切れになります。リゾルバにデータへのクエリーを頻繁に行わせるように低く設定することができます。（非常に大きい）TTLの値を信用しません。</dd>
<dt><strong>cache-min-ttl:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>キャッシュ内のRRsetsとメッセージの生存期間（TTL）の最小値。デフォルトは0です。最小値になったら、ドメイン所有者が意図した以上の間、データはキャッシュされます。そのように小さなクエリーはデータを検索するために行われます。0はキャッシュ内のデータがドメイン所有者の意図したように扱います。より高い値、特に1時間以上の値はキャッシュ内のデータが実際のデータと一致しなくなる問題を引き起こすことがあります。</dd>
<dt><strong>infra-host-ttl:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>ホスト キャッシュ内のエントリのTTL。The host cache contains roundtrip timing, lameness and EDNS support information. デフォルトは900です。</dd>
<dt><strong>infra-cache-slabs:</strong> <em>&lt;number&gt;</em></dt>
<dd>インフラストラクチャ キャッシュ内のスラブ数。スラブはスレッドによるロックの競合を減らします。値は2の累乗に設定してください。</dd>
<dt><strong>infra-cache-numhosts:</strong> <em>&lt;number&gt;</em></dt>
<dd>情報がキャッシュされるホスト数。デフォルトは10000です。</dd>
<dt><strong>do-ip4:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>IPv4のクエリーに回答したり、IPv4のクエリーを送信したりするかを指定します。デフォルトではyesです。</dd>
<dt><strong>do-ip6:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>IPv6のクエリーに回答したり、IPv6のクエリーを送信したりするかどうかを指定します。デフォルトではyesです。無効にしたときには、クエリーをIPv6で回答したり、インターネットのネームサーバーにクエリーをIPv6で送信したりしません。</dd>
<dt><strong>do-udp:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>UDPのクエリーに回答したり、UDPのクエリーを送信したりするかを指定します。デフォルトではyesです。</dd>
<dt><strong>do-tcp:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>TCPのクエリーに回答したり、TCPのクエリーを送信したりするかを指定します。デフォルトではyesです。</dd>
<dt><strong>tcp-upstream:</strong> <em>&lt;yes or no&gt;</em> (1.4.13-)</dt>
<dd>上流へのクエリーがトランスポートにTCPのみを使うかを指定します。デフォルトはnoです。トンネリングのときに役に立ちます。</dd>
<dt><strong>ssl-upstream:</strong> <em>&lt;yes or no&gt;</em> (1.4.14-)</dt>
<dd>上流へのクエリーがトランスポートに SSLのみを使うかを指定します。デフォルトはnoです。トンネリングのときに役に立ちます。SSLではTCPでのDNSメッセージを含んでいます。他のサーバーはこれをサポートしていなければなりません（<strong>ssl-service-key</strong>を参照）。</dd>
<dt><strong>ssl-service-key:</strong> <em>&lt;file&gt;</em> (1.4.14-)</dt>
<dd>有効であれば、サーバーはTCPソケットでSSLサービスを提供します。クライアントはssl-upstream: yesを使わなくてはなりません。このファイルはTLSセッションのプライベート鍵です。公開鍵証明書はssl-service-pemで指定するファイルです。デフォルトは""でオフになります。変更したら（リロードでは不十分なので）リスタートを必要とします。これは、プライベート鍵をrootのパーミッションに保ち、さらにchrootする前にプライベート鍵を読むためです。通常のDNSのTCPサービスは提供されず、エラーを出します。このサービスは異なる<strong>port:</strong>の設定か<strong>interface</strong>の設定における<em>@port</em>接尾語で動作します。</dd>
<dt><strong>ssl-service-pem:</strong> <em>&lt;file&gt;</em> (1.4.14-)</dt>
<dd>SSLサービスのための公開鍵証明書pemファイル。デフォルトは""でオフになります。</dd>
<dt><strong>ssl-port:</strong> <em>&lt;number&gt;</em> (1.4.14-)</dt>
<dd>TCP SSLサービスを提供するポート番号。デフォルトは443。SSLサービスを提供する@番号としてポート番号を設定したインターフェースのみ。</dd>
<dt><strong>do-daemonize:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>unboundサーバーがデーモンとしてバックグランドでフォークするかを指定します。デフォルトではyesです。</dd>
<dt><strong>access-control:</strong> <em>&lt;IP netblock&gt; &lt;action&gt;</em></dt>
<dd>ネットブロック（netblock）はクラスレス ネットワーク ブロックのために　/サイズ を追加したIPv4やIPv6のアドレスとして与えられます。アクション（action）は<em>deny</em>, <em>refuse</em>, <em>allow</em>, <em>allow_snoop</em>のどれかを指定します。</dd>
<dd>アクション<em>deny</em>は指定したネットブロックのホストからのクエリーを止めます。</dd>
<dd>アクション<em>refuse</em>もクエリーを止めます。しかし、DNSの応答コードREFUSEDエラーメッセージを送り返します。</dd>
<dd>アクション<em>allow</em>は指定したネットブロックのクライアントにアクセスを許可します。（ほとんどすべてのクライアントが必要とする）再帰クライアントのアクセスのみです。非再帰クエリーは拒否されます。</dd>
<dd>アクション<em>allow</em>は設定されたlocal-dataにアクセスする非再帰クエリーを許可します。この理由は、これがunboundサーバーの再帰検索のアルゴリズムに関わらず、静的データが応答で返されるためです。このことは非再帰クエリーが権威データのために行われる通常の動作をサポートします。非再帰クエリーにとっては動的キャッシュからのどんな応答も拒否されます。</dd>
<dd>アクション<em>allow_snoop</em>は非再帰アクセスも許可します。これは再帰および非再帰アクセスの両方とも許可することになります。<em>allow_snoop</em>という名前は、（悪意のある行動として）非再帰クエリーを使ってキャッシュの内容を調べるキャッシュ スヌーピングを表します。しかし、非再帰クエリーは（キャッシュの内容を調べたいときに使う）価値のあるデバッグツールでもあります。その場合には、あなたが管理しているホストのために<em>allow_snoop</em>を使ってください。</dd>
<dd>デフォルトではlocalhostのみが許可(<em>allow</em>)され、残りは拒否(<em>refuse</em>)されます。プロトコルの使いやすさのために、デフォルトでは拒否(<em>refuse</em>)されます。DNSプロトコルはポリシーによる落とされたパケットを扱うようには設計されていません。パケットを落とすことは（たぶん度を超えた）クエリーを繰り返すことになります。</dd>
<dt><strong>chroot:</strong> <em>&lt;directory&gt;</em></dt>
<dd>chrootが有効にされるとき、オリジナルのルートからフルパスとして（コマンドラインから）コンフィグファイルに記述するべきです。chrootが実行された後には、リロード後にコンフィグファイルを再読込できるように、コンフィグファイルのパスの使わなくなった部分が削除されます。</dd>
<dd>他のファイルのパス（作業ディレクトリ、ログファイル、ルートヒント、キーファイル）はいくつかの方法で指定できます。新しいルートに関する絶対パス、作業ディレクトリへの相対パス、オリジナル ルートに関する絶対パスなど。最後のケースでは、そのパスは使用されない部分を取り除くように調整されます。</dd>
<dd>PIDファイルは作業ディレクトリの相対パスでもオリジナル・ルートに対して相対的な絶対パスでもよいです。それはchrootのする前に書かれ、権限を落とします。例えば、これはPIDファイルを/var/run/unbound.pidにして、/var/unboundにchrootすることを許可します。</dd>
<dd>さらに、unboundはchrootの内側から（エントロピーのために）/dev/randomにアクセスできる必要があります。</dd>
<dd>値が与えられると、chrootが与えられたディレクトリに行われます。デフォルトは"/var/unbound"です。""が与えられたら、chrootは実行されません。</dd>
<dt><strong>username:</strong> <em>&lt;name&gt;</em></dt>
<dd>値が与えられると、ポートをバインドした後に、ユーザ権限が落とされます。デフォルトは"unbound"です。username: ""が与えられると、ユーザの変更が行われません。</dd>
<dd>このユーザがポートをバインドすることができないときには、（HUPシグナルでの）リロードは開いているポートを残したままにします。設定ファイルのポート番号を変更したら、その新しいポート番号は権限を必要とします。そのときには、リロードが失敗します。リスタートを必要とします。</dd>
<dt><strong>directory:</strong> <em>&lt;directory&gt;</em></dt>
<dd>プログラムが動作するディレクトリを設定します。デフォルトでは"/var/unbound"です。</dd>
<dt><strong>logfile:</strong> <em>&lt;filename&gt;</em></dt>
<dd>""が与えられると、ログ出力は標準エラーになります。デーモン化されたときにはどこにも出力されません。次にような形式でログファイルが追加されます。
<pre>
[seconds since 1970] unbound[pid:tid]: type: message. 
</pre>
このオプションが与えられると、use-syslogが"no"に設定されます。SIGHUPで設定ファイルが再読込されると、追加のためにログファイルが再オープンされます。 </dd>
<dt><strong>use-syslog:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>unboundが<em>syslog</em>(3)を使ってsyslogdにログメッセージに送るようにします。ログ ファシリティLOG_DAEMONが使われます。識別子は"unbound"です。use-syslogが有効なときには、ログファイルの設定は上書きされます。デフォルトはsyslogにログ出力されます。</dd>
<dt><strong>log-time-ascii:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>ログファイルにUTC asciiのタイムスタンプを使うようにします。デフォルトはnoです。ブラケット内に1970からの秒数を出力します。syslogを使うときには効果はありません。その場合には、syslogはログファイルに出力されるタイムスタンプの形式になります。</dd>
<dt><strong>log-queries:</strong> <em>&lt;yes or no&gt;</em> (1.4.11-)</dt>
<dd>クエリー毎に1行にログのタイムスタンプとIPアドレスと名前とタイプとクラスのログを出力します。デフォルトはnoです。サーバーを（かなり）より遅くするこれらの行を出力するのに時間がかかることに注意してください。名前の中の非印字文字は'?'として出力されます。</dd>
<dt><strong>pidfile:</strong> <em>&lt;filename&gt;</em></dt>
<dd>プロセスIDがそのファイルに書き込まれます。デフォルトは”/var/unbound/unbound.pid”です。 そのため
<pre>
kill -HUP `cat /var/unbound/unbound.pid` 
</pre>
はリロードします。
<pre>
kill -QUIT `cat /var/unbound/unbound.pid` 
</pre>
は正常に終了します。</dd>
<dt><strong>root-hints:</strong> <em>&lt;filename&gt;</em></dt>
<dd>このファイルからルートヒントを読みます。デフォルトは何もありません。INクラスの組み込みのヒントを使います。ファイルはゾーンファイルの形式です。ルート ネームサーバーの名前とアドレスのみです。サーバーが変わったときにはデフォルトは古くなります。そのため、ルートヒント ファイルを使うのは良い実践です。</dd>
<dt><strong>hide-identity:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>有効にすると、id.serverとhostname.bindクエリーは拒否されます。</dd>
<dt><strong>identity:</strong> <em>&lt;string&gt;</em></dt>
<dd>報告する識別子を設定します。""に設定したら、デフォルトになり、サーバーのホスト名が返されます。</dd>
<dt><strong>hide-version:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>有効にすると version.server と version.bind クエリーは拒否されます。</dd>
<dt><strong>version:</strong> <em>&lt;string&gt;</em></dt>
<dd>報告するバージョンを設定します。""に設定したら、デフォルトになり、パッケージのバージョンが返されます。</dd>
<dt><strong>target-fetch-policy:</strong> <em>&lt;list of numbers&gt;</em></dt>
<dd>ネームサーバーのターゲット アドレスを日和見的に取ってくるかを決めるために、unboundにより使用されるターゲット フェッチ ポリシーを設定します。ポリシーは依存の深さ毎に記述されます。</dd>
<dd>unboundがクエリーに回答するときに追跡する最大の依存の深さを数値が決めます。--1の値は依存の深さに応じて日和見的に全てのターゲットを取ってくることを意味します。0の値は要求に応じてのみに取ってくることを意味します。正の値は日和見的に多くのターゲットを取ってきます。</dd>
<dd>引用符（""）でリストを囲って、数字の間にスペースを置きます。デフォルトは"3 2 1 0 0"です。全ての値を0（"0 0 0 0 0"）にするとBIND 9に近い動作を与えます。また、"-1 -1 -1 -1 -1"はBIND 8に近いと噂をされる動作を与えます。</dd>
<dt><strong>harden-short-bufsize:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>クエリーからの非常に小さいEDNSのバッファ サイズが無視されます。デフォルトはoffです。それはクエリーを送るために適切なプロトコルであり、可能であればunboundがこれらのクエリーへのとても小さい回答を与えようとするためです。</dd>
<dt><strong>harden-large-queries:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>非常に大きいクエリーが無視されます。デフォルトはoffです。それはクエリーを送るのに適切なプロトコルであり、TSIGかEDNSのペイロードが非常に大きければ動作のために必要になるからです。</dd>
<dt><strong>harden-glue:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>サーバーの権威内にあるときのみグルー（glue）を信頼する。デフォルトはonです。</dd>
<dt><strong>harden-dnssec-stripped:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>トラスト アンカーのゾーンのためにDNSSECデータを必要とします。そのようなデータが無ければ、そのゾーンは偽物になります。設定をオフにしたら、DNSSECデータを受けません（あるいはDNSKEYデータが検証に失敗します）。それから、そのゾーンはセキュアではなくなります。これはトラストアンカーが無いような動作になります。パケットからDNSSECデータを取り除くような余計なことをするファイアウォールの内側にあるときにはこれをオフに設定できます。そうでないとゾーンは「署名されている」から頻繁に誤って署名されている「署名されていない」に変更されます。設定を切ったら、ゾーンのセキュリティを無効にするダウングレード攻撃の危険を負います。デフォルトはonです。</dd>
<dt><strong>harden-below-nxdomain:</strong> <em>&lt;yes or no&gt;</em> (1.4.8-)</dt>
<dd>draft-vixie-dnsext-resimproveより、すでにnxdomainになると知られているもう一つの名前の下で名前のクエリーにnxdomainを返します。DNSSECはempty nonterminalsのためにnoerrorを命令します。それ故にこれは可能です。非常に古いソフトウェアはempty nonterminalsのためにnxdomainを返すかもしれません。これは通常IPアドレスの逆引きで起こります。このように、これと互換性がない場合があります。古いソフトウェアはDNSSECを持たないので、これを避けようとするために、DNSSEC上セキュアなnxdomainのみが使われます。デフォルトはオフです。</dd>
<dt><strong>harden-referral-path:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>インフラストラクチャ データのために追加クエリーを実行する際に参照パスを強行します。トラスト アンカーが設定され、そのゾーンが署名されていたら、応答を検証します。これは回答への参照パス上にあるネームサーバーのNSの集まりとネームサーバーのアドレスにおいてDNSSECの検証を行います。デフォルトはオフです。権威サーバーの負担になり、RFC標準ではなく、生成される追加のクエリーの負荷のために性能の問題になり得るためです。実験的なオプションです。有効にしたら、target-fetch-policyが確認される最大深さを増やした後にさらに多く追加することを考慮してください。</dd>
<dt><strong>use-caps-for-id:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>だましの試みを未然に防ぐためにクエリーに0×20符号化されたランダムなビットを使用します。これは権威サーバーに送るクエリー名に小文字と大文字を混在させ、回答が正しい大文字・小文字を持っているかを確認します。デフォルトでは無効にされています。この機能はdraft dns-0×20の実験的な実装です。</dd>
<dt><strong>private-address:</strong> <em>&lt;IP address or subnet&gt;</em></dt>
<dd>IPv4やIPv6のアドレスかクラスレスのサブネットを与えます。これらはあなたのプライベートネットワークのアドレスであり、パブリックなインターネットの名前を返すことを許可しません。そのようアドレスがあればDNSの回答から削除されます。さらに、DNSSECバリデータは回答を偽であると示します。これはDNS Rebindingと呼ばれる攻撃に対して防御します。DNS Rebindingは、あなたのブラウザがネットワークプロキシに変えられ、あなたのプライベートネットワークの部分にブラウザを通してリモートアクセスを許してしまいます。名前によってはあなたのプライベートアドレスを含むことを許可されます。デフォルトでは、あなたが設定した全ての<strong>local-data</strong>が許可され、<strong>private-domain</strong>を使った追加の名前を指定することができます。プライベートアドレスはデフォルトでは有効ではありません。私たちは後のリリースではデフォルトでRFC1918のプライベートIPアドレス空間のためにこれを有効にすることを考えています。10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 192.254.0.0/16 fd00::/8 fe80::/10 がプライベートアドレスとして有効になるでしょう。これは、RFC標準がパブリックインターネットではこれらのアドレスは見えるべきではないといっているためです。127.0.0.0/8を有効にすることはそれを使っているたくさんのスパムブロックリストを妨げることになるでしょう。</dd>
<dt><strong>private-domain:</strong> <em>&lt;domain name&gt;</em></dt>
<dd>このドメインとプライベートアドレスを含むそのサブドメインの全てを許可します。プライベートアドレスを含む複数のドメイン名を許可するには複数回記述します。デフォルトは設定されていません。</dd>
<dt><strong>unwanted-reply-threshold:</strong> <em>&lt;number&gt;</em></dt>
<dd>設定されたら、スレッド毎に望まれない回答の総数が追跡されます。閾値に達したら、防御的な動作が取られ、警告がログに出力されます。防御的な動作は、RRsetとメッセージキャッシュがクリアされることです。うまくいけば、どんな毒も削除されるでしょう。1000万の値が提案されています。デフォルトは（オフである）0です。</dd>
<dt><strong>do-not-query-address:</strong> <em>&lt;IP address&gt;</em></dt>
<dd>与えられたIPアドレスをクエリーしません。IPv4でもIPv6でもよいです。クラスレス委譲のネットブロックを示すために「/数値」を追加します。たとえば、10.2.3.4/24や2001::11/64のように書きます。</dd>
<dt><strong>do-not-query-localhost:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>yesのときには、do-not-query-addressエントリーにlocalhostが追加されます。IPv6の::1とIPv4の127.0.0.1/8の両方です。noのときにはlocalhostはクエリーを送るのに使われます。デフォルトではyesです。</dd>
<dt><strong>prefetch:</strong> <em>&lt;yes or no&gt;</em> (1.4.2-)</dt>
<dd>yesのときには、キャッシュを最新に保つために期限切れにする前に、メッセージ キャッシュの要素がプリフェッチされます。デフォルトはnoです。有効にすると、マシンに約10パーセントのトラフィックと負荷を与えますが、人気のある項目はキャッシュから期限切れになりません。</dd>
<dt><strong>prefetch-key:</strong> <em>&lt;yes or no&gt;</em> (1.4.2-)</dt>
<dd>yesのときには、DSレコードに出会ったときには、DNSKEYを検証プロセスの中で事前に取得します。これはリクエストの遅延を低くします。これはほんの少し多くのCPUを使います。キャッシュが0に設定されていれば、利用されません。デフォルトはnoです。</dd>
<dt><strong>rrset-roundrobin:</strong> <em>&lt;yes or no&gt;</em> (1.4.17-)</dt>
<dd>yesのときには、Unboundはレスポンス内のRRsetの順番を循環させます（速度とスレッド セーフのために、クエリーIDから乱数はとられます）。デフォルトはnoです。</dd>
<dt><strong>minimal-responses:</strong> <em>&lt;yes or no&gt;</em>  (1.4.17-)</dt>
<dd>yesのときには、 Unboundはauhority/additionalセクションが要求されないときには、レスポンス メッセージにauhority/additional セクションを挿入しません。これはレスポンス サイズを十分に削減し、レスポンスによっては生じるTCPフォールバックを防ぐかもしれません。これはわずかなスピードアップにもなります。デフォルトはnoです。DNSプロトコルのRFCではこれらのセクションを命じており、追加の内容は役に立ち、クライアントのクエリーの往復回数を節約するからです。</dd>
<dt><strong>module-config:</strong> <em>&lt;module names&gt;</em></dt>
<dd>モジュールの設定です。スペース区切りでモジュール名のリストを記述し、引用符（""）で囲みます。モジュールにはvalidatorとiteratorが使用できます。"iterator"に設定すると、検証しないサーバーになります。"validator iterator"に設定すると、DNSSEC検証が有効になります。モジュールの順番が重要です。検証を行うために、トラスト アンカーも設定する必要があります</dd>
<dt><strong>trust-anchor-file:</strong> <em>&lt;filename&gt;</em></dt>
<dd>検証のための信頼済み鍵を持つファイル。DSとDNSKEYエントリーがそのファイルに記述できます。そのファイルの形式は標準のDNSゾーンファイルの形式です。デフォルトは""です。または、トラスト アンカー ファイルなしです。</dd>
<dt><strong>auto-trust-anchor-file:</strong> <em>&lt;filename&gt;</em>(1.4.0-)</dt>
<dd>RFC5011の探索で追跡される一つのゾーンのトラスト アンカーを持つファイル。その探索は月に数回行われます。そのため、マシンは頻繁にオンラインである必要があります。初期のファイルは<strong>trust-anchor-file</strong>に記述されるような内容にすることができます。そのファイルはアンカーが更新されたときに書かれます。そのため、unboundユーザーが書き込み権限を持つ必要があります。</dd>
<dt><strong>trust-anchor:</strong> <em>&lt;Resource Record&gt;</em></dt>
<dd>検証で使用する鍵のためのDSあるいはDNSKEYリソースレコード。trust-anchor-filesに加えて，複数のエントリーが複数の信頼済み鍵を指定することにより与えられます。リソースレコードは'dig'や'drill'の出力と同じ形式，すなわちゾーンファイルと同じ形式で入力されます。１行に""で囲う必要があります。TTLはカット アンド ペーストの容易さで指定できますが，無視されます。クラスは指定することができます。クラスINがデフォルトです。</dd>
<dt><strong>trusted-keys-file:</strong> <em>&lt;filename&gt;</em></dt>
<dd>検証のための信頼済み鍵を持つファイル。複数のエントリーがあるときには，エントリー毎に一つのファイルを指定します。<strong>trust-anchor-file</strong>のようですが、ファイル形式は異なります。BIND9の形式で、trusted-keys { name flag proto algo "key"; };節が読み込まれます。このオプションでワイルドカードを使うことができます。ワイルドカードは起動時やリロード時に展開されます。</dd>
<dt><strong>dlv-anchor-file:</strong> <em>&lt;filename&gt;</em></dt>
<dd>DLV (DNSSEC Lookaside Validation)の信頼済み鍵を持つファイル。DSとDNSKEYのエントリの両方とも<em>trust-anchor-file:</em>オプションと同じ形式で、ファイルに記述されます。1つのDLVだけ設定できます。より多く設定したら遅くなるでしょう。DLVはルートの信頼されるDLVとして使われます。これはルートのように見せることを意味します。デフォルトは""であり、DLVアンカー ファイルがないことを示します。</dd>
<dt><strong>dlv-anchor:</strong> <em>&lt;Resource Record&gt;</em></dt>
<dd>trust-anchorのようなものです。これはDSやDNSKEYをインラインで持つDLVアンカーです。</dd>
<dt><strong>domain-insecure:</strong> <em>&lt;domain name&gt;</em></dt>
<dd>ドメイン名をinsecureに設定します。DNSSECの信頼の輪はそのドメイン名に対して無視されます。そのため、そのドメイン名の上のトラスト アンカーはDSレコードでそのドメインをsecureにすることができず、DSレコードは無視されます。DLVからの鍵もそのドメインでは無視されます。署名されていないとして扱われる複数のドメインを指定するために複数回与えることができます。そのドメインのためにトラスト アンカーを設定したら、この設定を（そのドメインがsecureであると）上書きします。</dd>
<dd>これは外部の検索のためのトラスト アンカーを設定したいが、（未署名の）内部のドメインには影響がないようにしたいときに役に立ちます。DSレコードはその内部ドメインのためには外部的に検証失敗を生成できます。</dd>
<dt><strong>val-override-date:</strong> <em>&lt;rrsig-style date spec&gt;</em></dt>
<dd>デフォルトは""あるいは"0"であり、デバッグ機能を無効にします。RRSIG形式の日付を与えることにより有効にしたら、現在の日付の代わりに、RRSIGの有効期間の開始日時と終了日時を検証するために，その日付は使用されます。署名の有効期間の開始日時と終了日時をデバッグしないのであれば、これを設定してはいけません。-1は日付を全く無視します。特別なアプリケーションによっては役に立ちます。</dd>
<dt><strong>val-sig-skew-min:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>検証される署名に適応される時計のずれの最小の秒数。この設定の上限として、署名の有効期間（終了日時 - 開始日時）の10%の値が使われます。デフォルトは夏時間の差を許容する3600（1時間）。短い生存期間の署名の厳格な検証のためにこの値を低くできます。</dd>
<dt><strong>val-sig-skew-max:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>検証される署名に適応される時計のずれの最大の秒数。この設定の上限として、署名の有効期間（終了日時 - 開始日時）の10%の値が使われます。デフォルトは安定したドメインでのタイムゾーンの設定の問題で許容する86400（24時間）。最小と最大の両方をとても小さくすることは時計のずれの許容を無効にします。最小と最大の両方をとても大きくすることは、署名のタイムスタンプを少ない厳格さでバリデータが検証することになります。</dd>
<dt><strong>val-bogus-ttl:</strong> <em>&lt;number&gt;</em></dt>
<dd>不適正データの生存期間（TTL）。これは、不正な署名や他の確認のために、検証が失敗したデータです。そのデータのTTLは信頼できません。代わりにこの値が使われます。この値は秒で記述します。デフォルトは60です。その時間の間隔は不適正データの再検証を繰り返すのを防ぎます。</dd>
<dt><strong>val-clean-additional:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>正しく署名されていないセキュア メッセージの追加セクションからデータを削除するようにバリデータに教えます。安全ではない（insecure）、不適正（bogus）、不確定（indeterminate）、未確認（unchecked）のメッセージには作用しません。デフォルトではyesです。追加セクションの潜在的に間違ったデータから認証のためのバリデータにユーザが依存するのを防ぐためにこの設定が使用されます。</dd>
<dt><strong>val-log-level:</strong> <em>&lt;number&gt;</em> (1.4.0-)</dt>
<dd>バリデータに検証失敗をログに出力させます。饒舌さの設定に関係ありません。デフォルトは0で、オフです。1では、失敗したユーザーのクエリー毎に行がログに出力されます。このように、何が検証で起きているかを見ることができます。そのクエリーでなぜ検証が失敗しているかを見つけるために、digやdrillのような診断ツールを使います。2では、失敗したクエリーだけではなく、なぜunboundがそれが悪いと考えたか、またどのサーバーが失敗するデータを送ったのかも出力されます。</dd>
<dt><strong>val-permissive-mode:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>不確定として不適正メッセージに印を付けるようにバリデータに指示します。セキュリティの確認が実行されますが、結果が不適正（セキュリティが失敗している）のときには、通常通りにクライアントにSERVFAILで回答するのを抑えます。クライアントは不適正なデータを受け取ります。安全であるとわかったメッセージでは、ADビットが回答に設定されます。ログ出力も完全な検証のために実行されます。デフォルト値はnoです。</dd>
<dt><strong>ignore-cd-flag:</strong> <em>&lt;yes or no&gt;</em> (1.4.11-)</dt>
<dd>unboundがクライアントからのCDフラグを無視し、クライアントに不適正（bogus）の回答を返すのを拒否するように指示します。このように、CD (Checking Disabled)フラグはもはやチェックすることを無効にしません。これはCDフラグを設定するのにDNSSECを検証できないレガシー(w2008)サーバーがクライアントであるときに役に立ちます。そして、unboundはDNSSEC保護を持つそれらを提供します。デフォルト値はnoです。</dd>
<dt><strong>val-nsec3-keysize-iterations:</strong> <em>&lt;list of values&gt;</em></dt>
<dd>鍵サイズと繰り返し回数のリスト。スペース区切りにして、引用符で囲います。デフォルトは"1024 150 2048 500 4096 2500"です。たくさんのハッシュ化の繰り返しを実行する代わりにメッセージが安全でないと単に印を付ける前に、これはNSEC3の繰り返し回数で許可される最大値を決めます。このリストは昇順でなければならず、少なくとも一つのエントリーを持つ必要があります。"1024 65535"に設定したら、NSEC3繰り返し回数に制限はありません。この表は短いままにしておかなければなりません。非常に長いリストは動作を遅くする原因となるでしょう。</dd>
<dt><strong>add-holddown:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>この期間に新しいトラスト アンカーが見つかったら、その後に、新しいトラスト アンカーを追加するようにRFC5011トラスト アンカー 自動更新の<strong>auto-trust-anchor-file</strong>検出機構に命じます。デフォルトはRFCに従って30日です。</dd>
<dt><strong>del-holddown:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>この期間に破棄リストに保たれたら、その後に、破棄されたトラスト アンカーを削除するようにRFC5011トラスト アンカー 自動更新の<strong>auto-trust-anchor-file</strong>検出機構に命じます。デフォルトはRFCに従って30日です。</dd>
<dt><strong>keep-missing:</strong> <em>&lt;seconds&gt;</em></dt>
<dd>この期間に新しいトラスト アンカーが見つからなかったら、その後に、見つからないトラスト アンカーを削除するようにRFC5011トラスト アンカー自動更新の<strong>auto-trust-anchor-file</strong>検出機構に命じます。これは対象のゾーンがトラスト アンカーの破棄を実行しなかったらその状態ファイルを一掃します。そのため、これは通常の（RFC5011ではない）ロールオーバーを実行するゾーンで自動検出機構が働くようにします。デフォルトは366日です。RFCに従って、値0は見つからないアンカーを削除しません。</dd>
<dt><strong>key-cache-size:</strong> <em>&lt;number&gt;</em></dt>
<dd>鍵キャッシュのバイトサイズ数。デフォルトは4メガバイトです。数字だけの時はバイトです。キロバイト、メガバイト、ギガバイトのときには数字の後ろに'k'、'm'、'g'を追加します。なお、メガバイトは1024*1024バイトです。</dd>
<dt><strong>key-cache-slabs:</strong> <em>&lt;number&gt;</em></dt>
<dd>鍵キャッシュ内のスラブの数。スラブはスレッドによるロックの競合を減らします。値は2の累乗に設定してください。CPUの数（に近い値）に設定することは理にかなっています。</dd>
<dt><strong>neg-cache-size:</strong> <em>&lt;number&gt;</em></dt>
<dd>積極的なネガティブ キャッシュのバイトサイズ数です。デフォルトは1メガバイトです。数字だけの時はバイトです。キロバイト、メガバイト、ギガバイトのときには数字の後ろに'k'、'm'、'g'を追加します。なお、メガバイトは1024*1024バイトです。</dd>
<dt><strong>local-zone:</strong> <em>&lt;zone&gt; &lt;type&gt;</em></dt>
<dd>ローカル ゾーンを設定します。typeはlocal-dataに一致しないときに与える回答を決めます。typeにはdeny, refuse, static, transparent, redirect, nodefault, typetransparentがあります。説明は次の通りです。その後に、デフォルトの設定が並べられています。ローカル ゾーンにデータを入力するためにはlocal-data:を使用します。ローカル ゾーンに対する回答は権威あるDNSの回答です。デフォルトではゾーンはクラスINです。</dd>
<dd>参照、ワイルドカード、CNAME/DNAMEサポート、DNSSEC権威サービスといった複雑な権威データを必要とするときには、後述するスタブ ゾーンの節に詳細な記述があるstub-zoneを設定してください。</dd>
<dt><em>deny</em></dt>
<dd>回答を送信せず、クエリーを落とします。ローカル データに一致したら、クエリーに回答します。</dd>
<dt><em>refuse</em></dt>
<dd>rcode REFUSEDを伴ってエラーメッセージの返答を送信します。ローカル データに一致したら、クエリーに回答します。</dd>
<dt><em>static</em></dt>
<dd>ローカル データに一致したら、クエリーに回答します。一致しないときには、クエリーに対してnodataあるいはnxdomainを回答します。ゾーン頂点ドメインのlocal-dataとして存在するときには、否定回答として回答にSOAが含まれます。</dd>
<dt><em>transparent</em></dt>
<dd>ローカル データに一致したら、クエリーに回答します。一致しないときには、クエリーが普通に解決されます。クエリーがローカル データで与えられた名前であり、ローカル データで与えらたデータのタイプでなかったら、noerror nodataの回答が返されます。local-zoneが指定されていないときには、local-dataはデフォルトで生成されるtransparentゾーンを与えます。</dd>
<dt><em>typetransparent</em></dt>
<dd>ローカル データに一致したら、クエリーに回答します。クエリーが異なる名前のためか異なるタイプで同じ名前のためであれば、クエリーは普通に解決されます。それで、AAAAクエリーにnodataの返答を引き起こさないローカル データのAレコードがあるように、transparentに似ていてローカル データにリストされたタイプは普通に解決されます。</dd>
<dt><em>redirect</em></dt>
<dd>クエリーはゾーン名のローカル データから回答されます。ゾーン名の下にローカル データは無くてもよいです。これはゾーンとゾーンのローカル データがあるゾーンの全てのサブドメインに対してクエリーを回答します。エンドユーザーに異なるアドレスレコードを返すためにドメインをリダイレクトするために使われます。「local-zone: "example.com." redirect」と「local-data: "example.com A 127.0.0.1"」を設定すると、www.example.comとwww.foo.example.comのクエリーはユーザがウェブブラウザでexample.comでサイトにアクセスできないようにリダイレクトされます。</dd>
<dt><em>nodefault</em></dt>
<dd>AS112ゾーンのためのデフォルトの内容をオフにします。他のタイプもゾーンのデフォルトの内容をオフにします。'nodefault'オプションは与えられたゾーンに対するデフォルトの内容をオフにする以外の効果はありません。 </dd>
</dl>
<p>デフォルトのゾーンは localhost, 127.0.0.1と::1の逆引き, AS112ゾーンです。AS112ゾーンはインターネットが正しい回答を提供することができないプライベートおよび予約IPアドレスの逆引きDNSゾーンです。デフォルトではNXDOMAIN（逆引きの情報なし）という回答を与えるように設定されています。その名前についてあなたが設定したlocal-zoneを指定したり、'nodefault'タイプを使用したりすることによりデフォルトをオフにすることができます。デフォルトのゾーンの内容の一覧を以下に並べます。</p>
<dl compact="compact">
<dt><em>localhost</em></dt>
<dd>IPv4とIPv6のlocalhostの情報が与えられます。NSとSOAレコードは完全さのためとDNS更新ツールに適合するために提供されます。デフォルトの内容は次の通りです。 
<pre>
local-zone: "localhost." static
local-data: "localhost. 10800 IN NS localhost."
local-data: "localhost. 10800 IN 
    SOA localhost. nobody.invalid. 1 3600 1200 604800 10800"
local-data: "localhost. 10800 IN A 127.0.0.1"
local-data: "localhost. 10800 IN AAAA ::1"
</pre></dd>
<dt><em>IPv4ループバックの逆引き</em></dt>
<dd>デフォルトの内容は次の通りです。 
<pre>
local-zone: "127.in-addr.arpa." static
local-data: "127.in-addr.arpa. 10800 IN NS localhost."
local-data: "127.in-addr.arpa. 10800 IN 
    SOA localhost. nobody.invalid. 1 3600 1200 604800 10800"
local-data: "1.0.0.127.in-addr.arpa. 10800 IN 
    PTR localhost."
</pre></dd>
<dt><em>IPv6ループバックの逆引き</em></dt>
<dd>デフォルトの内容は次の通りです。 
<pre>
local-zone: "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.
    0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa." static
local-data: "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.
    0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa. 10800 IN 
    NS localhost."
local-data: "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.
    0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa. 10800 IN 
    SOA localhost. nobody.invalid. 1 3600 1200 604800 10800"
local-data: "1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.
    0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa. 10800 IN 
    PTR localhost."
</pre></dd>
<dt><em>RFC1918ローカル使用ゾーンの逆引き</em></dt>
<dd>10.in-addr.arpa, 16.172.in-addr.arpaから31.172.in-addr.arpaまで, 168.192.in-addr.arpaのゾーンの逆引きデータ。<strong>local-zone:</strong>はstaticに設定され，<strong>local-data:</strong>としてSOAとNSレコードが提供されます。</dd>
<dt><em>RFC3330で規定されたIPv4アドレスの'this', リンク ローカル, テストネット、ブロードキャストの逆引き</em></dt>
<dd>0.in-addr.arpa, 254.169.in-addr.arpa, 2.0.192.in-addr.arpa (TEST NET 1), 100.51.198.in-addr.arpa (TEST NET 2), 113.0.203.in-addr.arpa (TEST NET 3), 255.255.255.255.in-addr.arpaのゾーンの逆引きデータ</dd>
<dt><em>RFC4291で規定されたIPv6の未指定アドレスの逆引き</em></dt>
<dd>次のゾーンの逆引きデータ 
<pre>
0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.
0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa.
</pre></dd>
<dt><em>RFC4193 IPv6の ローカルに割り当てられたローカルアドレス（Locally Assigned Local Addresses）の逆引き</em></dt>
<dd>D.F.ip6.arpaのゾーンの逆引きデータ。</dd>
<dt><em>RFC4291 IPv6 のリンク ローカル アドレスの逆引き</em></dt>
<dd>8.E.F.ip6.arpaからB.E.F.ip6.arpaのゾーンの逆引きデータ。</dd>
<dt><em>IPv6の例示のプレフィックスの逆引き</em></dt>
<dd>8.B.D.0.1.0.0.2.ip6.arpaゾーンの逆引きデータ。このゾーンはチュートリアルや例のために使われます。次のような記述でこのゾーンのブロックを削除することができます。 
<pre>
  local-zone: 8.B.D.0.1.0.0.2.ip6.arpa. nodefault
</pre>
local-zone文でゾーンの一部をtransparentに設定することで選択的に防がないこともできます。これは他のデフォルトのゾーンでも機能します。</dd>
<dt><strong>local-data:</strong> <em>&lt;resource record string&gt;</em></dt>
<dd>ローカル データを設定します。ローカル データに対するクエリーに応答する際に使われます。local-zoneをredirectとして設定しなければ、クエリーは正確に一致する必要があります。正確に一致しなければ、local-zoneタイプはさらなる処理を決めます。local-dataがlocal-zoneのサブドメインではないように設定されていれば、transparent local-zoneが設定されます。TXTのようなレコード タイプでは、「local-data: 'example. TXT "text"'」のようにシングル クオートを使います。 </dd>
<dd>参照、ワイルドカード、CNAME/DNAMEサポート、DNSSEC権威サービスといった複雑な権威データを必要とするときには、後述するスタブ ゾーンの節に詳細な記述があるstub-zoneを設定してください。</dd>
<dt><strong>local-data-ptr:</strong> <em>IPaddr name</em></dt>
<dd>逆引きのIPv4とIPv6アドレスとそのホスト名を持つPTRレコードのためにローカル データの簡略形を設定します。例えば、"192.0.2.4 www.example.com"のように記述します。TTLは次のように挿入することができます。 "2001:DB8::4 7200 www.example.com"</dd>
</dl>
<h3>リモート制御オプション</h3>
<p><strong>remote-control:</strong>節ではリモート制御のための設定が行われます。この設定が有効にされたときには、<em><a href="../unbound-control/">unbound-control</a></em>(8)ユーティリティが動いているunboundサーバーにコマンドを送るのに使われます。サーバーは接続のためにSSLv3やTLSv1のセキュリティを設定するためにこの節を使います。<em><a href="../unbound-control/">unbound-control</a></em>(8)ユーティリティはオプションのためにも<strong>remote-control</strong>セクションを読みます。正しい自己署名証明書を設定するために、<em><a href="../unbound-control-setup/">unbound-control-setup</a></em>ユーティリティを使います。</p>
<dl compact="compact">
<dt><strong>control-enable:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>このオプションはリモート制御を有効にするために使われます。デフォルトは"no"です。オフにしたときには、サーバーは制御コマンドのために待ち受けません。</dd>
<dt><strong>control-interface: &lt;ip address&gt;</strong></dt>
<dd>制御コマンドを待ち受けるIPv4やIPv6のアドレスを与えます。デフォルトではlocalhost（127.0.0.1と::1）で待ち受けます。全てのインターフェースで待ち受けるためには 0.0.0.0 と ::0 を使います。</dd>
<dt><strong>control-port: &lt;port number&gt;</strong></dt>
<dd>制御コマンドを待ち受けるポート番号。デフォルトは8953です。このポート番号を変更するときには、権限が落とされ、リロードは再びポートを開くのに十分な権限がありません。再起動する必要があります。</dd>
<dt><strong>server-key-file: &lt;private key file&gt;</strong></dt>
<dd>サーバーのプライベート鍵のパスです。デフォルトはunbound_server.keyです。このファイルは<em>unbound-control-setup</em>ユーティリティにより生成されます。このファイルは<em>unbound-control</em>ではなくunbound サーバーにより使われます。</dd>
<dt><strong>server-cert-file: &lt;certificate file.pem&gt;</strong></dt>
<dd>自己署名証明書へのパス。デフォルトはunbound_server.pemです。このファイルは<em>unbound-control-setup</em>ユーティリティにより生成されます。このファイルはunboundサーバーにより使われます。さらに、<em>unbound-control</em>からも使われます。</dd>
<dt><strong>control-key-file: &lt;private key file&gt;</strong></dt>
<dd>制御クライアントのプライベート鍵へのパス。デフォルトはunbound_control.keyです。このファイルは<em>unbound-control-setup</em>ユーティリティにより生成されます。このファイルは<em>unbound-control</em>により使われます。</dd>
<dt><strong>control-cert-file: &lt;certificate file.pem&gt;</strong></dt>
<dd>制御クライアントの証明書へのパス。デフォルトはunbound_control.pemです。この証明書はサーバー証明書により署名されています。このファイルは<em>unbound-control-setup</em>ユーティリティにより生成されます。このファイルは<em>unbound-control</em>により使われます。</dd>
</dl>
<h3>スタブ ゾーン オプション</h3>
<p>複数の<strong>stub-zone:</strong>節を記述できます。それぞれが「name:」と0個以上のホスト名かIPアドレスを持ちます。スタブ ゾーンでは、ネームサーバーのリストが使われます。クラスINが想定されます。サーバーは再帰検索サーバーではなく、権威サーバーであるべきです。unboundはスタブ ゾーンに対して再帰検索処理を実行します。</p>
<p>スタブ ゾーンは公開されているインターネット サーバーを使ってアクセスできないリゾルバに使われる権威データを設定するために使用できます。これは会社内部のデータやプライベート ゾーンに役に立ちます。異なるホスト（あるいは異なるポート）にある権威サーバーを設定してください。Enter a config entry for unbound with <strong>stub-addr:</strong> &lt;ip address of host[@port]&gt;. unboundのリゾルバは公開されたインターネットを参照することなく、そのデータにアクセスできます。</p>
<p>公開鍵の付いた信頼済み鍵エントリーがコンフィグに記述された場合には、この設定はDNSSECの署名されたゾーンが権威サーバーにより提供されるのを許可します。そのため、unboundがデータの検証をして、プライベート ゾーンへの応答にADビットを設定することができます（権威サーバーはADビットを設定しません）。この設定はunboundがプライベート ゾーンへのクエリーに回答することができるようにし、ADビット（'authentic'）を設定します。しかし、AA（'authoritative'）ビットはこの応答では設定されません。</p>
<dl compact="compact">
<dt><strong>name:</strong> <em>&lt;domain name&gt;</em></dt>
<dd>スタブ ゾーンの名前。</dd>
<dt><strong>stub-host:</strong> <em>&lt;domain name&gt;</em></dt>
<dd>スタブ ゾーンのネームサーバーの名前。使用される前に自身の名前の解決が行われます。</dd>
<dt><strong>stub-addr:</strong> <em>&lt;IP address&gt;</em></dt>
<dd>スタブ ゾーンのネームサーバーのIPアドレス。IPv4でもIPv6でもよいです。DNS通信の標準でないポート番号を使うためには、ポート番号の前に'@'を追加します。</dd>
<dt><strong>stub-prime:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>このオプションはデフォルトでオフです。有効であれば、NSのセットにプライミングを実行します。これはroot hintsに似ており、そのゾーンにより発行されたネームサーバーのリストを使って開始します。このため、hintリストがわずかに期限が切れたら、リゾルバは正しいリストをオンラインで拾います。</dd>
<dt><strong>stub-first:</strong> <em>&lt;yes or no&gt;</em></dt>
<dd>If enabled, a query is attempted without the stub clause if it fails. デフォルトはnoです。</dd>
</dl>
<h3>フォワード ゾーンのオプション</h3>
<p>複数の<strong>forward-zone:</strong>節を記述できます。それぞれは「<strong>name:</strong>」と0個以上のホスト名かIPアドレスを持ちます。フォワード ゾーンでは、このネームサーバーのリストはクエリーをフォワードするために使用されます。<strong>forward-host:</strong> and <strong>forward-addr:</strong>として記述されたサーバーはクエリーに対する更なる再帰検索を扱わなければなりません。そのため、これらのサーバーは権威サーバーではなく、（unboundのような）再帰検索サーバーです。unboundはフォワード ゾーンそのものに対する再帰検索を行いません。リモート サーバーに行わせます。クラスINが想定されます。名前"."とforward-addrターゲットを持つフォワード ゾーンのエントリーは（キャッシュから回答しなければ）他のサーバーに全てのクエリーをフォワードします。</p>
<dl compact="compact">
<dt><strong>name:</strong> <em>&lt;domain name&gt;</em></dt>
<dd>フォワード ゾーンの名前。</dd>
<dt><strong>forward-host:</strong> <em>&lt;domain name&gt;</em></dt>
<dd>フォワードするサーバーの名前。使用される前に自身の名前の解決が行われます。</dd>
<dt><strong>forward-addr:</strong> <em>&lt;IP address&gt;</em></dt>
<dd>フォワードするサーバーのIPアドレス。IPv4でもIPv6でもよいです。DNS通信の標準でないポート番号を使うためには、ポート番号の前に'@'を追加します。</dd>
<dt><strong>forward-first:</strong> <em>&lt;yes or no&gt;</em> (1.4.17-)</dt>
<dd>有効にすると、クエリーが失敗したときにフォワード節を無しとみなしてクエリーを試みます。デフォルトはnoです。</dd>
</dl>
<h3>Pythonモジュール オプション</h3>
<p><strong>python:</strong>節は<em>python</em>(1)スクリプト モジュールの設定を与えます。このモジュールはクエリーと回答についてiteratorモジュールとvalidatorモジュールが振る舞うように動きます。このスクリプト モジュールを有効にするために、デーモンに利用するようにコンパイルされている必要があります。"python"という単語は<strong>module-config:</strong>オプション（通常は最初に、あるいはvalidatorとiteratorの間）に記述される必要があります。</p>
<dl compact="compact">
<dt><strong>python-script:</strong> <em>&lt;python file&gt;</em></dt>
<dd>ロードされるスクリプト ファイル。</dd>
</dl>
<h2>メモリ制御の例</h2>
<p>以下に示すコンフィグの設定例では、メモリ使用量が削減されます。サービス レベルは低くなり、著しく大きなデータと高いTCP負荷はもうサポートしません。非常に大きなデータと高いTCP負荷はDNSでは例外的です。DNSSECの検証は有効であり、トラスト アンカーを追加します。3MB以上のメモリを使うプログラムについて心配する必要がなければ、以下の例はあなたに適していません。完全なサービスを受けるためにはデフォルトを使ってください。BSD-32ビットではヘビーに使った後では30～40MBを超えます。</p>
<pre>
# メモリの使用量を削減する設定例
        num-threads: 1
        outgoing-num-tcp: 1     # this limits TCP service, uses less buffers.
        incoming-num-tcp: 1
        outgoing-range: 60      # uses less memory, but less performance.
        msg-buffer-size: 8192   # note this limits service, 'no huge stuff'.
        msg-cache-size: 100k
        msg-cache-slabs: 1
        rrset-cache-size: 100k
        rrset-cache-slabs: 1
        infra-cache-numhosts: 200
        infra-cache-slabs: 1
        key-cache-size: 100k
        key-cache-slabs: 1
        neg-cache-size: 10k
        num-queries-per-thread: 30
        target-fetch-policy: "2 1 0 0 0 0"
        harden-large-queries: "yes"
        harden-short-bufsize: "yes"
</pre>
<h2>ファイル</h2>
<dl compact="compact">
<dt><em>/var/unbound</em></dt>
<dd>デフォルトのunboundの作業ディレクトリ。</dd>
<dt><em>/var/unbound</em></dt>
<dd>デフォルトの<em>chroot</em>(2) の場所。</dd>
<dt><em>/etc/unbound/unbound.conf</em></dt>
<dd>unboundの設定ファイル。</dd>
<dt><em>/var/unbound/unbound.pid</em></dt>
<dd>動作中のデーモンのプロセスIDを保存しているデフォルトのunboundのPIDファイル。</dd>
<dt><em>unbound.log</em></dt>
<dd>unboundのログファイル。デフォルトは<em>syslog</em>(3)に出力します。</dd>
</dl>
<h2>関連項目</h2>
<p><em><a href="../unbound/">unbound</a></em>(8), <em><a href="../unbound-checkconf/">unbound-checkconf</a></em>(8).</p>
<h2>著者</h2>
<p><strong>Unbound</strong>はNLnet Labsにより開発されました。詳細は配布ファイルに含まれているファイルCREDITSを見てください。</p>
<hr />
