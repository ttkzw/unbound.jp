---
title: unbound-control(8)
sidebar:
    order: 12
---
<h1>unbound-control</h1>
<p>Section: unbound 1.4.17 (8)<br />
Updated: May 24, 2012<br /></p>
<hr />
<h2>名前</h2>
<p><strong>unbound-control,</strong> <strong>unbound-control-setup</strong> - Unboundリモートサーバー制御ユーティリティ</p>
<h2>書式</h2>
<p><strong>unbound-control</strong> [<strong>-h</strong>] [<strong>-c</strong> <em>cfgfile</em>] [<strong>-s</strong> <em>server</em>] <em>command</em></p>
<h2>説明</h2>
<p><strong>Unbound-control</strong>は<em><a href="../unbound/">unbound</a></em>(8) DNSサーバーのリモート管理を行います。設定ファイルを読み込み、unboundサーバーにSSL越しで接続し、コマンドを送り、結果を表示します。</p>
<p>利用できるオプションは以下の通りです。</p>
<dl compact="compact">
<dt><strong>-h</strong></dt>
<dd>バージョンとコマンドライン オプションのヘルプを表示します。</dd>
<dt><strong>-c</strong> <em>cfgfile</em></dt>
<dd>設定を読み込む設定ファイル。省略したら、デフォルトの設定ファイルが使われます。</dd>
<dt><strong>-s</strong> <em>server[@port]</em></dt>
<dd>接続するサーバーのIPv4かIPv6のアドレス。省略したら、アドレスは設定ファイルから読まれます。</dd>
</dl>
<h2>コマンド</h2>
<p>以下のコマンドが利用できます。</p>
<dl compact="compact">
<dt><strong>start</strong></dt>
<dd>サーバーを起動します。単に<em><a href="../unbound/">unbound</a></em>(8)を実行します。unboundの実行ファイルは環境変数<strong>PATH</strong>から検索します。<em>-c</em>を使って指定した設定ファイルかデフォルトの設定ファイルを使って起動します。</dd>
<dt><strong>stop</strong></dt>
<dd>サーバーを停止します。サーバー・デーモンが終了します</dd>
<dt><strong>reload</strong></dt>
<dd>サーバーをリロードします。これはキャッシュを削除し、新しい設定ファイルを読み込みます。</dd>
<dt><strong>verbosity</strong> <em>number</em></dt>
<dd>ログ出力の饒舌さの値を変更します。<a href="../unbound.conf/">unbound.conf</a></em>(5)における<strong>verbosity</strong>キーワードと同じ値です。サーバーがreload（設定ファイルの再読込）制御コマンドか次のverbosity制御コマンドが発行されるまでこの新しい設定値は続きます。</dd>
<dt><strong>log_reopen</strong></dt>
<dd>ログファイルを開き直します。一度閉じてから開きます。ログ出力しているファイルをデーモンが離すので、ログローテーションに役に足ります。syslogを使っているのであれば、syslogを閉じて、開き直すのを試みます。ただし、chrootのときはうまく動かないかもしれません。</dd>
<dt><strong>stats</strong></dt>
<dd>統計を出力します。統計を出力します。内部カウンタを0にリセットします。これは<strong>statistics-cumulative</strong>設定オプションを使って制御できます。統計は行毎に[名前]: [値]の形式で出力されます。</dd>
<dt><strong>stats_noreset</strong></dt>
<dd>統計を覗きます。<strong>stats</strong>コマンドと同じように出力します。しかし、内部カウンタを0にリセットしません。</dd>
<dt><strong>status</strong></dt>
<dd>サーバーの状態を表示します。（ポートへの接続が拒否されて）動かなければ終了コードは3、エラーは1、動けば0です。</dd>
<dt><strong>local_zone</strong> <em>name</em> <em>type</em></dt>
<dd>名前とタイプを伴ったローカル・ゾーンを追加します。<strong>local-zone</strong>設定オプションと同じです。そのゾーンがすでに存在していたら、タイプは与えられた引数に変更されます。</dd>
<dt><strong>local_zone_remove</strong> <em>name</em></dt>
<dd>与えられた名前のローカル・ゾーンを削除します。そのゾーン内の全てのローカル・データも削除します。そのゾーンが存在しなかったら、コマンドは成功します。</dd>
<dt><strong>local_data</strong> <em>RR data...</em></dt>
<dd>新しいローカル・データ、すなわち与えられたリソース・レコードを追加します。そのゾーンが存在しないときを除いて、<strong>local-data</strong>設定オプションと同じです。この場合は、このリモート制御コマンドはこのレコードと同じ名前のtransparentゾーンを生成します。このコマンドは詳細な文法エラーを返すことはしません。</dd>
<dt><strong>local_data_remove</strong> <em>name</em></dt>
<dd>ローカル名から全てのリソース・レコードのデータを削除します。その名前が項目をすでに持っていなければ、何も起きません。（staticゾーンでは）その名前に対して結果はNXDOMAINになります。しかし、その名前が空の終端でないもの（削除された名前の下のドメイン名にまだデータがある）になれば、NOERRORデータなしという回答がその名前に対しての結果になります。</dd>
<dt><strong>dump_cache</strong></dt>
<dd>キャッシュの内容が標準出力にテキスト形式で出力されます。ファイルにキャッシュを保存するため、ファイルにリダイレクトできます。</dd>
<dt><strong>load_cache</strong></dt>
<dd>キャッシュの内容を標準入力から読み込みます。dump_cacheと同じ形式を使います。古いか間違ったデータのキャッシュを読み込むことは、古いか間違ったデータをクライアントに返すという結果になります。このようにキャッシュにデータを読み込むことはデバッグを手助けするために用意されています。</dd>
<dt><strong>lookup</strong> <em>name</em></dt>
<dd>指定した名前を検索するのに使われたネームサーバーを標準出力に出力します。</dd>
<dt><strong>flush</strong> <em>name</em></dt>
<dd>キャッシュからその名前を削除します。タイプとしてA, AAAA, NS, SOA, CNAME, DNAME, MX, PTR, SRV, NAPTRを削除します。それは速く行えます。他のレコード・タイプは<strong>flush_type</strong>や<strong>flush_zone</strong>を使って削除できます。</dd>
<dt><strong>flush_type</strong> <em>name</em> <em>type</em></dt>
<dd>キャッシュからその名前とタイプの情報を削除します。</dd>
<dt><strong>flush_zone</strong> <em>name</em></dt>
<dd>キャッシュからその名前以下の全ての情報を削除します。新しい検索が行われるように、そのRRsetとキー・エントリは削除されます。これは、キャッシュ全体を歩き、検査する必要があり、動作が遅いです。</dd>
<dt><strong>flush_stats</strong></dt>
<dd>統計を0にリセットします。</dd>
<dt><strong>flush_requestlist</strong></dt>
<dd>実行中のクエリーを落とします。サーバーが実行中のクエリーの実行を止めます。キャッシュは影響を受けません。これらのクエリーに対して返答は送られません。おそらく、後ほど再びこれらのユーザのリクエストが行われます。より高い饒舌さのレベルのような新しい設定でクエリーに働くようにサーバーを再起動させるのに役に立ちます。</dd>
<dt><strong>dump_requestlist</strong></dt>
<dd>何を処理しているかを見せます。サーバーが処理している最中のすべてのクエリーを出力します。ユーザが待たされている時間を出力します。内部のリクエストでは、時間は出力されません。それから、モジュールの状態を出力します。</dd>
<dt><strong>flush_infra</strong> <em>all|IP</em></dt>
<dd>allであれば、全てのインフラ キャッシュが空にされます。特定のIPアドレスであれば、そのアドレスのエントリーがキャッシュから削除されます。これには、EDNS、ping、不完全データが含まれます。</dd>
<dt><strong>dump_infra</strong></dt>
<dd>インフラ キャッシュの内容を見せます。</dd>
<dt><strong>set_option</strong> <em>opt: val</em></dt>
<dd>再読込なしに与えられた値をオプションに設定します。それ故に、キャッシュは流されません。オプションは':'で終わり、空白がそのオプションと値の間になければなりません。このように設定しても、値によっては効果がないものもあります。新しい値は設定ファイルに書き込まれません。すべてのオプションがサポートされるわけでもありません。これはlibunboundのset_optionコールとは異なります。unboundは初期化されていないため、すべての値が使えます。</dd>
<dd>使える値は次の通りです: statistics-interval, statistics-cumulative, do-not-query-localhost, harden-short-bufsize, harden-large-queries, harden-glue, harden-dnssec-stripped, harden-below-nxdomain, harden-referral-path, prefetch, prefetch-key, log-queries, hide-identity, hide-version, identity, version, val-log-level, val-log-squelch, ignore-cd-flag, add-holddown, del-holddown, keep-missing, tcp-upstream, ssl-upstream。</dd>
<dt><strong>get_option</strong> <em>opt</em></dt>
<dd>オプションの値を得ます。':'なしでオプション名を与えます。その値が出力されます。値が""であれば、何も出力されず、接続は閉じます。エラー時には、'error ...'が出力されます（見知らぬオプションによる文法エラーを与えます）。オプションによっては、各行に一つずつのような値の一覧が出力されます。そのオプションはset_optionで修正された設定ファイルから見えます。オーバーライドが行われてもよいオプションによっては、このコマンド（例えば、verbosityやforwardの制御コマンドの結果）では現れません。すべてのオプションが使えるわけではありません。list_stubsとlist_forwardsとlist_local_zonesとlist_local_data for thoseを参照してください。</dd>
<dt><strong>list_stubs</strong></dt>
<dd>利用中のスタブ ゾーンの一覧を表示します。出力に1つずつ表示されます。これには利用中のルート ヒントも含まれます。</dd>
<dt><strong>list_forwards</strong></dt>
<dd>利用中のフォワード ゾーンの一覧を表示します。出力にゾーン毎に表示されます。</dd>
<dt><strong>list_local_zones</strong></dt>
<dd>利用中のローカル ゾーンの一覧を表示します。ゾーン タイプと共に行毎に一つづつ表示されます。</dd>
<dt><strong>list_local_data</strong></dt>
<dd>利用中のローカル データのリソース レコードの一覧を表示します。そのリソース レコードが表示されます。</dd>
<dt><strong>forward_add</strong> [<em>+i</em>] <em>zone addr ...</em></dt>
<dd>動作中のunboundに新しいフォワード ゾーンを追加します。 さらに、+i オプションを付けると、ゾーンに対して（他の名前のためにDNSSECルート トラストアンカーを持っていればinsecureで解決できる）<em>domain-insecure</em>を追加します。unbound.confの<em>forward-zone</em>の設定のように、アドレスはIPv4 でも IPv6 でもネームサーバーのホスト名でもよいです。</dd>
<dt><strong>forward_remove</strong> [<em>+i</em>] <em>zone</em></dt>
<dd>動作中のunboundからフォワード  ゾーンを削除します。さらに、+iオプションも付けると、ゾーンに対して<em>domain-insecure</em>を削除します。</dd>
<dt><strong>stub_add</strong> [<em>+ip</em>] <em>zone addr ...</em></dt>
<dd>動作中のunboundに新しいスタブ ゾーンを追加します。さらに、+iオプションも付けると、ゾーンに対して<em>domain-insecure</em>を追加します。+pオプションを付けるとそのスタブゾーンはprimeに設定されます。付けなければnotprimeに設定されます。unbound.confの<em>stub-zone</em>の設定のように、アドレスはIPv4 でも IPv6 でもネームサーバーのホスト名でもよいです。</dd>
<dt><strong>stub_remove</strong> [<em>+i</em>] <em>zone</em></dt>
<dd>動作中のunboundからスタブ ゾーンを削除します。さらに、+iオプションも付けると、ゾーンに対して<em>domain-insecure</em>を削除します。</dd>
<dt><strong>forward</strong> [<em>off</em> | <em>addr ...</em> ]</dt>
<dd>フォワードのモードを設定します。サーバーが他の上流のネームサーバーに尋ねるべきかを設定します。インターネット ルート ネームサーバー自身に行くべきか、あるいは現在の設定を見せます。DHCP更新の後にネームサーバーを渡すことができます。</dd>
<dd>引数が無い場合には、すべてのクエリーをフォワードするために使われている現在のアドレスの一覧が表示されます。起動時にはforward-zoneは"."です。その後、状態を見せます。フォワードが使われていなければ、出力しません。</dd>
<dd><em>off</em>が渡されたら、フォワードは無効にされ、ルート ネームサーバーが使われます。これはバギーなネームサーバーやDHCPから返されたDNSSECをサポートしていないネームサーバーを避けるために使うこともできます。しかし、ホテルやホットスポットでは働かないかもしれません。</dd>
<dd>一つ以上のIPv4やIPv6のアドレスが渡されたら、クエリーをフォワードするのに使われます。このとき、アドレスはスペース区切りです。'@port'でポート番号が正しく設定されます（デフォルトのポートは53（DNS）です。）</dd>
<dd>デフォルトでは、ルート"."のためには、設定ファイルからのフォワーダーの情報が使われます。設定ファイルは変更されません。そのため、リロード後にこれらの変更は消えます。設定ファイルでの他のフォワード ゾーンはこのコマンドにより影響を受けません。</dd>
</dl>
<h2>終了コード</h2>
<p>unbound-controlプログラムは、エラーのときにはステータスコード1で、成功のときにはステータスコード0で終了します。</p>
<h2>セットアップ</h2>
<p>セットアップはサーバーとクライアントの両方に自己署名証明書とプライベート鍵を要求します。スクリプト<em>unbound-control-setup</em>はデフォルトの実行ディレクトリ、あるいは-dで指定した別のディレクトリにそれらを生成します。鍵ファイルへのアクセス制御の権限を変更すれば、全てのユーザではなくデフォルトの所有者とグループによりunbound-controlを誰が使うかを決めることができます。デーモンがファイルを読み込むのを許可されるように、unbound.confで設定したのと同じユーザ名あるいはrootとしてスクリプトを実行します。例えば次のように実行します:</p>
<pre>
    sudo -u unbound unbound-control-setup
</pre>
<p>unbound.confでユーザ名を設定していなければ、デーモンを起動させたユーザの証明のために鍵は読み込み権限を必要とします。スクリプトはディレクトリに存在するプライベート鍵を保存します。rootとしてスクリプトを動かした後に、<em>unbound.conf</em>で<strong>control-enable</strong>をオンにしてください。</p>
<h2>STATISTIC COUNTERS</h2>
<p>The <em>stats</em> command shows a number of statistic counters.</p>
<dl compact="compact">
<dt><em>threadX.num.queries</em></dt>
<dd>number of queries received by thread</dd>
<dt><em>threadX.num.cachehits</em></dt>
<dd>number of queries that were successfully answered using a cache lookup</dd>
<dt><em>threadX.num.cachemiss</em></dt>
<dd>number of queries that needed recursive processing</dd>
<dt><em>threadX.num.prefetch</em></dt>
<dd>number of cache prefetches performed. This number is included in cachehits, as the original query had the unprefetched answer from cache, and resulted in recursive processing, taking a slot in the requestlist. Not part of the recursivereplies (or the histogram thereof) or cachemiss, as a cache response was sent.</dd>
<dt><em>threadX.num.recursivereplies</em></dt>
<dd>The number of replies sent to queries that needed recursive processing. Could be smaller than threadX.num.cachemiss if due to timeouts no replies were sent for some queries.</dd>
<dt><em>threadX.requestlist.avg</em></dt>
<dd>The average number of requests in the internal recursive processing request list on insert of a new incoming recursive processing query.</dd>
<dt><em>threadX.requestlist.max</em></dt>
<dd>Maximum size attained by the internal recursive processing request list.</dd>
<dt><em>threadX.requestlist.overwritten</em></dt>
<dd>Number of requests in the request list that were overwritten by newer entries. This happens if there is a flood of queries that recursive processing and the server has a hard time.</dd>
<dt><em>threadX.requestlist.exceeded</em></dt>
<dd>Queries that were dropped because the request list was full. This happens if a flood of queries need recursive processing, and the server can not keep up.</dd>
<dt><em>threadX.requestlist.current.all</em></dt>
<dd>Current size of the request list, includes internally generated queries (such as priming queries and glue lookups).</dd>
<dt><em>threadX.requestlist.current.user</em></dt>
<dd>Current size of the request list, only the requests from client queries.</dd>
<dt><em>threadX.recursion.time.avg</em></dt>
<dd>Average time it took to answer queries that needed recursive processing. Note that queries that were answered from the cache are not in this average.</dd>
<dt><em>threadX.recursion.time.median</em></dt>
<dd>The median of the time it took to answer queries that needed recursive processing. The median means that 50% of the user queries were answered in less than this time. Because of big outliers (usually queries to non responsive servers), the average can be bigger than the median. This median has been calculated by interpolation from a histogram.</dd>
<dt><em>total.num.queries</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.num.cachehits</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.num.cachemiss</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.num.prefetch</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.num.recursivereplies</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.requestlist.avg</em></dt>
<dd>averaged over threads.</dd>
<dt><em>total.requestlist.max</em></dt>
<dd>the maximum of the thread requestlist.max values.</dd>
<dt><em>total.requestlist.overwritten</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.requestlist.exceeded</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.requestlist.current.all</em></dt>
<dd>summed over threads.</dd>
<dt><em>total.recursion.time.median</em></dt>
<dd>averaged over threads.</dd>
<dt><em>time.now</em></dt>
<dd>current time in seconds since 1970.</dd>
<dt><em>time.up</em></dt>
<dd>uptime since server boot in seconds.</dd>
<dt><em>time.elapsed</em></dt>
<dd>time since last statistics printout, in seconds.</dd>
</dl>
<h2>EXTENDED STATISTICS</h2>
<dl compact="compact">
<dt><em>mem.total.sbrk</em></dt>
<dd>If <a href="../sbrk/">sbrk</a>(2) is available, an estimate of the heap size of the program in number of bytes. Close to the total memory used by the program, as reported by top and ps. Could be wrong if the OS allocates memory non-contiguously.</dd>
<dt><em>mem.cache.rrset</em></dt>
<dd>Memory in bytes in use by the RRset cache.</dd>
<dt><em>mem.cache.message</em></dt>
<dd>Memory in bytes in use by the message cache.</dd>
<dt><em>mem.mod.iterator</em></dt>
<dd>Memory in bytes in use by the iterator module.</dd>
<dt><em>mem.mod.validator</em></dt>
<dd>Memory in bytes in use by the validator module. Includes the key cache and negative cache.</dd>
<dt><em>histogram.&lt;sec&gt;.&lt;usec&gt;.to.&lt;sec&gt;.&lt;usec&gt;</em></dt>
<dd>Shows a histogram, summed over all threads. Every element counts the recursive queries whose reply time fit between the lower and upper bound. Times larger or equal to the lowerbound, and smaller than the upper bound. There are 40 buckets, with bucket sizes doubling.</dd>
<dt><em>num.query.type.A</em></dt>
<dd>The total number of queries over all threads with query type A. Printed for the other query types as well, but only for the types for which queries were received, thus =0 entries are omitted for brevity.</dd>
<dt><em>num.query.type.other</em></dt>
<dd>Number of queries with query types 256-65535.</dd>
<dt><em>num.query.class.IN</em></dt>
<dd>The total number of queries over all threads with query class IN (internet). Also printed for other classes (such as CH (CHAOS) sometimes used for debugging), or NONE, ANY, used by dynamic update. num.query.class.other is printed for classes 256-65535.</dd>
<dt><em>num.query.opcode.QUERY</em></dt>
<dd>The total number of queries over all threads with query opcode QUERY. Also printed for other opcodes, UPDATE, ...</dd>
<dt><em>num.query.tcp</em></dt>
<dd>Number of queries that were made using TCP towards the unbound server.</dd>
<dt><em>num.query.ipv6</em></dt>
<dd>Number of queries that were made using IPv6 towards the unbound server.</dd>
<dt><em>num.query.flags.RD</em></dt>
<dd>The number of queries that had the RD flag set in the header. Also printed for flags QR, AA, TC, RA, Z, AD, CD. Note that queries with flags QR, AA or TC may have been rejected because of that.</dd>
<dt><em>num.query.edns.present</em></dt>
<dd>number of queries that had an EDNS OPT record present.</dd>
<dt><em>num.query.edns.DO</em></dt>
<dd>number of queries that had an EDNS OPT record with the DO (DNSSEC OK) bit set. These queries are also included in the num.query.edns.present number.</dd>
<dt><em>num.answer.rcode.NXDOMAIN</em></dt>
<dd>The number of answers to queries, from cache or from recursion, that had the return code NXDOMAIN. Also printed for the other return codes.</dd>
<dt><em>num.answer.rcode.nodata</em></dt>
<dd>The number of answers to queries that had the pseudo return code nodata. This means the actual return code was NOERROR, but additionally, no data was carried in the answer (making what is called a NOERROR/NODATA answer). These queries are also included in the num.answer.rcode.NOERROR number. Common for AAAA lookups when an A record exists, and no AAAA.</dd>
<dt><em>num.answer.secure</em></dt>
<dd>Number of answers that were secure. The answer validated correctly. The AD bit might have been set in some of these answers, where the client signalled (with DO or AD bit in the query) that they were ready to accept the AD bit in the answer.</dd>
<dt><em>num.answer.bogus</em></dt>
<dd>Number of answers that were bogus. These answers resulted in SERVFAIL to the client because the answer failed validation.</dd>
<dt><em>num.rrset.bogus</em></dt>
<dd>The number of rrsets marked bogus by the validator. Increased for every RRset inspection that fails.</dd>
<dt><em>unwanted.queries</em></dt>
<dd>Number of queries that were refused or dropped because they failed the access control settings.</dd>
<dt><em>unwanted.replies</em></dt>
<dd>Replies that were unwanted or unsolicited. Could have been random traffic, delayed duplicates, very late answers, or could be spoofing attempts. Some low level of late answers and delayed duplicates are to be expected with the UDP protocol. Very high values could indicate a threat (spoofing).</dd>
</dl>
<h2>ファイル</h2>
<dl compact="compact">
<dt><em>/etc/unbound/unbound.conf</em></dt>
<dd>unboundの設定ファイル。</dd>
<dt><em>/var/unbound</em></dt>
<dd>プライベート鍵(unbound_server.keyとunbound_control.key)と自己署名証明書(unbound_server.pemとunbound_control.pem)を置くディレクトリ。</dd>
</dl>
<h2>関連項目</h2>
<p><em><a href="../unbound.conf/">unbound.conf</a></em>(5), <em><a href="../unbound/">unbound</a></em>(8).</p>
<hr />
