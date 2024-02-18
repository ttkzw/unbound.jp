---
title: unbound(8)
---
<h1>unbound</h1>
<p>Section: unbound 1.4.17 (8)<br />
Updated: May 24, 2012<br /></p>
<hr />
<h2>名前</h2>
<p><strong>unbound</strong> - Unbound DNS検証機能付きリゾルバ 1.4.17.</p>
<h2>書式</h2>
<p><strong>unbound</strong> [<strong>-h</strong>] [<strong>-d</strong>] [<strong>-v</strong>] [<strong>-c</strong> <em>cfgfile</em>]</p>
<h2>説明</h2>
<p><strong>unbound</strong> はキャッシュ機能とDNSSEC検証機能を持つDNSリゾルバの実装です。</p>
<p>利用できるオプションは以下の通りです。</p>
<dl compact="compact">
<dt><strong>-h</strong></dt>
<dd>バージョンとコマンドライン オプションのヘルプを表示します。</dd>
<dt><strong>-c</strong> <em>cfgfile</em></dt>
<dd>デフォルトの場所にある設定ファイル（/etc/unbound/unbound.conf）を読む代わりに、読み込むunboundの設定ファイルを指定します。その文法は<em><a href="../unbound.conf/">unbound.conf</a></em>(5)に記述されています。</dd>
<dt><strong>-d</strong></dt>
<dd>デバッグ フラグ。バックグラウンドにフォークしません。コンソールに付いたままになります。このフラグはスレッドが生成する時間までログファイルへの書き込みも遅らせます。そのため、大抵の設定エラーは標準エラーに表示されます。</dd>
<dt><strong>-v</strong></dt>
<dd>饒舌さを増やします。複数回与えると、より多くの情報を記録します。これは設定ファイルのverbosityの値に加えられます。</dd>
</dl>
<h2>関連項目</h2>
<p><em><a href="../unbound.conf/">unbound.conf</a></em>(5), <em><a href="../unbound-checkconf/">unbound-checkconf</a></em>(8).</p>
<h2>著者</h2>
<p><strong>Unbound</strong>開発者は配布物に含まれているCREDITSファイルに記述されています。</p>
<hr />
