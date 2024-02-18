---
title: unbound-anchor(8)
---
<h1>unbound-anchor</h1>
<p>Section: unbound 1.4.17 (8)<br />
Updated: May 24, 2012<br /></p>
<hr />
<h2>名前</h2>
<p><strong>unbound-anchor</strong> - Unboundアンカー ユーティリティ。</p>
<h2>書式</h2>
<p><strong>unbound-anchor</strong> [<strong>opts</strong>]</p>
<h2>説明</h2>
<p><strong>unbound-anchor</strong> はDNSSEC検証のためのルート トラスト アンカーの設置と更新を行います。コマンドラインから（rootとして）実行されるか、あるいは起動スクリプトの中で実行されます。<em><a href="../unbound/">unbound</a></em>(8) DNSサーバーを起動する前に。</p>
<p>提案する使い方は次の通りです：</p>
<pre>
        # initスクリプトにおける記述
        （必要であれば）ルート アンカーを提供あるいは更新する。
        unbound-anchor -a "/etc/unbound/root.key"
        # Please note usage of this root anchor is at your own risk
        # and under the terms of our LICENSE (see source)
        #
        # 検証リゾルバを起動する
        # このとき、unbound.confは次の行を含む
        #   auto-trust-anchor-file: "/etc/unbound/root.key"
        unbound -c unbound.conf
</pre>
<p>このツールはルート アンカーとルート更新証明書ファイルのための組み込みのデフォルトの鍵や証明書を提供します。</p>
<p>ルート アンカーのファイルが機能するかを試験します。機能しなければ、更新が可能であれば、ルート更新証明書を使ってルート アンカーの更新を試みます。root-anchors.xmlをhttpsで取得して、その結果を検証します。すべての検証が成功すれば、ルート アンカーのファイルを更新します。成功しなければ、ルート アンカーのファイルは変更されません。DNS経由でDNSSECの情報が利用できれば、RFC5011の追跡を行います。</p>
<p>証明書が期限切れであったり、ネットワークがダウンしたり、他のエラーが起きたりしたら更新を行いません。</p>
<p>利用できるオプションは以下の通りです。</p>
<dl compact="compact">
<dt><strong>-a</strong> <em>file</em></dt>
<dd>読み書きするルート アンカーの鍵ファイル。デフォルトは/etc/unbound/root.keyです。ファイルが存在しない、あるいは空であれば、組み込みのルートの鍵が書き込まれます。</dd>
<dt><strong>-c</strong> <em>file</em></dt>
<dd>読み込むルート更新証明書ファイル。デフォルトは/etc/unbound/icannbundle.pemです。ファイルが存在しないか空であれば、組み込みの証明書が使われます。</dd>
<dt><strong>-l</strong></dt>
<dd>組み込みのルート鍵と組み込みのルート更新証明書を標準出力に出力します。</dd>
<dt><strong>-u</strong> <em>name</em></dt>
<dd>サーバー名。"https://サーバー名"に接続します。"https://"なしで指定します。デフォルトは"data.iana.org"です。-Pオプションで指定したポート番号に接続します。必要であれば、IPv4アドレスやIPv6アドレス（ブラケットなし）で渡すこともできます。</dd>
<dt><strong>-x</strong> <em>path</em></dt>
<dd>サーバー上のroot--anchors.xmlファイルへのパス名。（-uオプションのURLを構成する）。デフォルトは /root-anchors/root-anchors.xmlです。</dd>
<dt><strong>-s</strong> <em>path</em></dt>
<dd>サーバー上のroot-anchors.p7sファイルへのパス名。（-uオプションのURLを構成する）。デフォルトは /root-anchors/root-anchors.p7sです。このファイルはxmlファイルのPKCS7署名になります。トラスト アンカーとしては（-cオプションで）PEM形式のファイルを使います。</dd>
<dt><strong>-4</strong></dt>
<dd>ドメインの解決とhttpsでのサーバーへの接続にIPv4を使います。デフォルトはIPv4とIPv6の適切な方を使います。</dd>
<dt><strong>-6</strong></dt>
<dd>ドメインの解決とhttpsでのサーバーへの接続にIPv6を使います。デフォルトはIPv4とIPv6の適切な方を使います。</dd>
<dt><strong>-f</strong> <em>resolv.conf</em></dt>
<dd>与えられたresolv.confファイルを使います。デフォルトでは有効ではありませんが、システムによっては/etc/resolv.confを渡そうとしてもよいです。resolv.confファイルには利用する再帰検索ネームサーバーのIPアドレスが記述されています。しかし、このツールはその再帰検索ネームサーバーを立ち上げるために使われるので、（サーバーが起動していなかったり、立ち上がり中だったりすると）役に立たないでしょう。上流のキャッシュサーバーが配置されている（そして動いている）のを知っていて、固定の入り口がある状況では役に立つかもしれません。</dd>
<dt><strong>-r</strong> <em>root.hints</em></dt>
<dd>ドメインの解決を立ち上げるために（BINDとUnboundのルート ヒント ファイルと同じ文法の）与えられたroot.hintsファイルを使います。デフォルトでは、組み込みのルート ヒントのリストが使われます。（-uオプションで）サーバーを解決するために、およびルートのDNSKEYレコードを検証するために、unbound-anchorはこれらのルートのためにそのネットワークにアクセスします。そのようにしたら、そのツールは再帰検索リゾルバを立ち上げるために使われるので、そのサーバーを立ち上げている最中であるので、その再帰検索リゾルバを使うことはできません。</dd>
<dt><strong>-v</strong></dt>
<dd>より饒舌になります。一つのvで、情報メッセージを出力します。たくさん指定すると（証明書のすべてやダウンロードされたファイルのバイトダンプのような）多くのデバッグ情報が有効になります。デフォルトでは、ほとんど何も出力しません。デフォルトではエラーについても何も出力しません。オリジナルのルート アンカー ファイルは単にそのままにされます。そのため、再帰検索サーバーはその後に起動できます。</dd>
<dt><strong>-C</strong> <em>unbound.conf</em></dt>
<dd>使われているリゾルバのプロセスにunbound.confを読み込ませるデバッグ オプション。</dd>
<dt><strong>-P</strong> <em>port</em></dt>
<dd>https接続のために使われるポート番号を設定します。デフォルトは443です。</dd>
<dt><strong>-F</strong></dt>
<dd>xmlファイルをダウンロードして、証明書でそのファイルを検証することにより、ルート アンカーの更新を行わせるデバッグ オプション。デフォルトでは、始めにDNSに接続することにより更新を試みます。それは非常に少ない帯域を使い、（2秒ではなく200ミリ秒のように）もっと速いです。そして、設置されたインフラではもっとよくなります。このオプションでは、まだそのようにしようとします（そして饒舌に語ります）。しかし、それから、結果を無視して、xmlフォールバック メソッドを使うようになります。</dd>
<dt><strong>-h</strong></dt>
<dd>バージョンとコマンドライン オプションのヘルプを表示します。</dd>
<dt><strong>-v</strong></dt>
<dd>より饒舌になります。何か起きたかを詳細に出力します。</dd>
</dl>
<h2>終了コード</h2>
<p>ルート アンカーが証明書を使って更新されたり、組み込みのルート アンカーが使われたら、このツールはコード1で終了します。更新が必要でなかったり、RFC5011追跡で更新が可能であったり、エラーが発生したらコード0で終了します。</p>
<p>次のようにして、終了コードを確認できます。</p>
<pre>
        unbound-anchor -a "root.key" || logger "Please check root.key"
</pre>
<p>あるいは、あなたの操作環境にもっと適したものでも確認できます。</p>
<h2>信用</h2>
<p>このツールに含まれているルート鍵と更新証明書は利便のためおよび我々のライセンス（ソースコードの配布物のLICENSEファイルあるいは<a href="http://unbound.nlnetlabs.nl/svn/trunk/LICENSE">http://unbound.nlnetlabs.nl/svn/trunk/LICENSE</a>を参照）の条件の下に提供されてます。失効したり、あなたの目的に適していないかもしれません。</p>
<p>"unbound-anchor -l"を実行することにより、コード内に構成されている鍵と証明書があなたの利便のために出力されます。</p>
<p>組み込みの構成はルート証明書ファイルとルート鍵ファイルを提供することにより上書きできます。</p>
<h2>ファイル</h2>
<dl compact="compact">
<dt><em>/etc/unbound/root.key</em></dt>
<dd>RFC5011追跡で更新された読み書き可能なルート アンカー ファイル。このファイルは存在しなければ作成されます。</dd>
<dt><em>/etc/unbound/icannbundle.pem</em></dt>
<dd>ダウンロードしたDNSSECルートトラストアンカーを検証するために使われる信用済み自己署名証明書。<a href="https://data.iana.org/root-anchors/icannbundle.pem">https://data.iana.org/root-anchors/icannbundle.pem</a>から取得することにより更新することができます。さらに検証できます。もし、ファイルが存在しないか空であれば、組み込みのバージョンが使用されます。</dd>
<dt><em><a href="https://data.iana.org/root-anchors/root-anchors.xml">https://data.iana.org/root-anchors/root-anchors.xml</a></em></dt>
<dd>ルート鍵情報の基。</dd>
<dt><em><a href="https://data.iana.org/root-anchors/root-anchors.p7s">https://data.iana.org/root-anchors/root-anchors.p7s</a></em></dt>
<dd>ルート鍵情報の署名。</dd>
</dl>
<h2>関連項目</h2>
<p><em><a href="../unbound.conf/">unbound.conf</a></em>(5), <em><a href="../unbound/">unbound</a></em>(8).</p>
<hr />
