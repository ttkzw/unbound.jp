---
title: Unbound - 最適化の方法
---
<author>
  By W.C.A. Wijngaards, NLnet Labs, October 2008, updated July 2010.
</author>

<p>
これはunboundを最適化するためのガイドです。ほとんどのユーザはこれを行う必要はありません。しかし、大規模なリゾルバでは役に立つでしょう。下記の文書はunboundユーザからのフィードバックの結果です。異なる経験や推奨があれば、私に知らせてください。
</p>

<h2>設定</h2>
<p>
<code>num-threads</code>をシステムのCPUのコア数に等しくなるように設定します。例えば、2コアのCPUが4個あれば、8を使います。
</p>
<p>
*-slabsを<code>num-threads</code>の値に近くなる2の累乗に設定します。<code>msg-cache-slabs</code>と<code>rrset-cache-slabs</code>と<code>infra-cache-slabs</code>と<code>key-cache-slabs</code>に対してこれを行います。これはロックの競合を減らします。
</p>
<p>
キャッシュのメモリサイズを増やします。msgキャッシュメモリの約2倍のrrsetキャッシュメモリを使ってください。例えば、<code>rrset-cache-size: 100m</code>と<code>msg-cache-size: 50m</code>です。mallocのオーバーヘッドにより、総メモリ使用量は設定ファイルに記入した総キャッシュメモリの2倍（あるいは2.5倍）まで増える可能性があります。
</p>
<p>
<code>outgoing-range</code>を可能な限り値を大きくするように設定します。全体で1024の制限を乗り越える方法については後述するセクションを見てください。これにより一度に多くのクライアントにサービスを提供します。1コアでは、950。2コアでは、450。4コアでは、200。<code>num-queries-per-thread</code>は<code>outgoing-range</code>の半分の数に設定するのが最もよいです。しかし、クエリーの数が突出したときにそれを吸収できるだけたくさん欲しいでしょう。<code>outgoing-range</code>の制限のために<code>num-queries-per-thread</code>も制限されます。<code>outgoing-range</code>の1024の制限をなくせるように、（下記のセクションに示す）libeventを使うようにコンパイルするのがよいでしょう。
</p>
<p>
負荷の高いサーバでは<code>so-rcvbuf</code>をより大きな値（4mか8m）に設定します。これは負荷が突出したときにメッセージが失われないようにカーネルバッファを大きく設定します。応答信頼性（reply-reliability）のパーセンテージにさらに9sを加えます。OSは最大値で上限をかけます。Linux上ではunboundはその制限を回避するためにroot権限を必要とします。あるいは管理者は<code>sysctl net.core.rmem_max</code>を使うことができます。BSDでは、<code>/etc/sysct.conf</code>で<code>kern.ipc.maxsockbuf</code>を変えます。OpenBSDではヘッダを変え、カーネルを再コンパイルします。Solarisでは<code>ndd -set /dev/udp udp_max_buf 8388608</code>を行います。
</p>
<p>
最適化した設定の短い概要をここに示します。
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre><span class="cm"># some optimisation options.</span>
server:
        <span class="cm"># use all CPUs</span>
        num-threads: &lt;number of cores&gt;  
	
        <span class="cm"># power of 2 close to num-threads  </span>
        msg-cache-slabs: &lt;same&gt;
        rrset-cache-slabs: &lt;same&gt;
        infra-cache-slabs: &lt;same&gt;
        key-cache-slabs: &lt;same&gt;

        <span class="cm"># more cache memory, rrset=msg*2</span>
        rrset-cache-size: 100m
        msg-cache-size: 50m

        <span class="cm"># more outgoing connections</span>
        <span class="cm"># depends on number of cores: 1024/cores - 50 </span>
        outgoing-range: 950

        <span class="cm"># Larger socket buffer.  OS may need config.</span>
        so-rcvbuf: 4m
</pre>
</td></tr></tbody></table>

<p>
デフォルトの設定はうまく働きます。しかし、多くのユーザにサービスを提供する必要があるときにはシステムの制限に達してしまいます。大部分はファイル記述子の数です。デフォルトで1024の制限があります。1024個より多くのファイル記述子を使うためには、libeventかフォーク運用を使います。これらについては下のセクションで記述します。
</p>

<h2>Libeventの使い方</h2>
<p>
libeventはプラットホーム特有のイベント通知システムコールのBSDライセンスのクロスプラットフォーム ラッパーです。
Unboundは1024個より多くのファイル記述子を効率よく使うためにlibeventを使うことができます。お好みのパッケージ マネージャでlibeventを（もしあればlibevent-develも）インストールします。unboundをコンパイルする前に、./configure <code>--with-libevent</code>を実行します。
</p>
<p>
そうすれば、<code>outgoing-range</code>にお好みのどんな数でも設定することができます。同様に<code>num-queries-per-thread</code>の値も増やせます。
</p>

<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre>        <span class="cm"># with libevent</span>
        outgoing-range: 8192
        num-queries-per-thread: 4096 
</pre>
</td></tr></tbody></table>

<p>
libevent-1.4.8-stableでうまく動いているとのユーザからの報告があります。LinuxとFreeBSDで4096や8192を値として設定してうまく動いていることをユーザが確認しています。<code>num-queries-per-thread</code>を2倍にして<code>outgoing-range</code>として使います。
</p>
<p>
安定版の（古い）ディストリビューションではlibevent-1.1のような古いバージョンのパッケージが含まれています。このようなパッケージではクラッシュの報告があります。そのため、libeventをアップグレードする必要があります。unbound 1.2.0では、libeventコールの競合条件が修正されました。
</p>
<p>
unboundはlibeventやlibevのビルド ディレクトリを指定してコンパイルできます; <code>configure --with-libevent=/home/user/libevent-1.4.8-stable</code>や<code>configure --with-libevent=/home/user/libev-3.52</code>のように指定します。
</p>
<p>
<b>備考</b> いずれせよクラッシュを経験したら、以下のことを試すことができます。libeventを更新します。問題が存続するのであれば、libeventは環境変数をセットすることにより異なるシステムコール バックエンドを使うことができあます。unboundはverbosityをレベル4にするときに使用中のバックエンドを報告します。unboundを開始する前に、<code>EVENT_NOKQUEUE</code>や<code>EVENT_NODEVPOLL</code>や <code>EVENT_NOPOLL</code>や<code>EVENT_NOSELECT</code>や<code>EVENT_NOEPOLL</code>や <code>EVENT_NOEVPORT</code>をシェルでyesに設定することで、それらのバックエンドが除外できます。poll(2)バックエンドは信頼できますが、遅いです。
</p>

<h2>フォーク動作</h2>
<p>
unboundはスレッディングなしに動作する独特なモードを持っています。これは、libeventがプラットフォームで失敗するとき、更なる性能のため、毒が他に入らないようにコア間で壁を作るときなどに役に立ちます。
</p>
<p>
フォーク動作を使うようにコンパイルするためには、コンパイル前にスレッドを無効にして、フォーク動作を有効にするために./configure <code>--without-pthreads --without-solaris-threads</code>を実行します。ロッキングが行われないため、そのコードは10%から20%くらい速度が向上します。
</p>
<p>
設定ファイルには、（スレッドではなくプロセスを使うとしても）<code>num-threads</code>に使いたいコア数を指定します。そして、<code>outgoing-range</code>とキャッシュメモリの値はすべてスレッド毎にあります。これはコア毎にコア自身のキャッシュを使うため、もっと多くのメモリが使われることを意味します。コア毎に自身のキャッシュを持つため、キャッシュに毒入れされたときでも他のコアには影響はありません。
</p>
<table border-collapse="collapsed" border="1"><tbody><tr><td>
<pre><span class="cm"># with forked operation</span>
server:
        <span class="cm"># use all CPUs</span>
        num-threads: &lt;number of cores&gt;  
	
        msg-cache-slabs: 1
        rrset-cache-slabs: 1
        infra-cache-slabs: 1
        key-cache-slabs: 1

        <span class="cm"># more cache memory, rrset=msg*2  </span>
        <span class="cm"># total usage is 150m*cores </span>
        rrset-cache-size: 100m
        msg-cache-size: 50m

        <span class="cm"># does not depend on number of cores </span>
        outgoing-range: 950
        num-queries-per-thread: 512 

        <span class="cm"># Larger socket buffer.  OS may need config.</span>
        so-rcvbuf: 4m
</pre>
</td></tr></tbody></table>

<p>
プロセス毎に多くても1024個のファイル記述子を使っているため、有効な最大値はコア数×1024です。上述した設定ではプロセス毎に950個を使います。4つのプロセッサでは3800個のソケットを与えます。クエリー毎にソケットを取得することを保証し、いくつかのソケットをqueries-for-nameserversに割かせるために、スレッド毎のクエリー数はソケットの数の半分です。
</p>

<p>
libeventといっしょにフォーク動作を使うことも可能です。スレッドの代わりに異なるプロセスにファイル記述子をOSに提供させるのに役に立ちます。基底にあるネットワーク スタックがプロセス毎の（遅い）検索構造を使っていれば、これは（急進的な）異なる性能を持つでしょう。
</p>

<p>この文章は<a href="http://www.unbound.net/documentation/howto_optimise.html">Unbound: Howto Optimise (www.unbound.net)</a>の翻訳です。[翻訳: 滝澤 隆史]</p>
