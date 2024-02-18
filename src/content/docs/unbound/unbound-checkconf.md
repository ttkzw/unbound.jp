---
title: unbound-checkconf(8)
sidebar:
    order: 9
---
<h1>unbound-checkconf</h1>
<p>Section: unbound 1.4.17 (8)<br />
Updated: May 24, 2012<br /></p>
<hr />
<h2>名前</h2>
<p>unbound-checkconf - unboundの設定ファイルのエラーを検査する。</p>
<h2>書式</h2>
<p><strong>unbound-checkconf</strong> [<strong>-h</strong>] [<strong>-o</strong> <em>option</em>] [<em>cfgfile</em>]</p>
<h2>説明</h2>
<p><strong>Unbound-checkconf</strong>は<em><a href="../unbound/">unbound</a></em>(8) DNSリゾルバの文法とエラーを検査します。設定ファイルの文法は<em><a href="../unbound.conf/">unbound.conf</a></em>(5)に記述されています。</p>
<p>利用できるオプションは以下の通りです。</p>
<dl compact="compact">
<dt><strong>-h</strong></dt>
<dd>バージョンとコマンドライン オプションのヘルプを表示します。</dd>
<dt><strong>-o</strong> <em>option</em></dt>
<dd>設定ファイルの検査後に、このオプションがあれば、そのオプションの値が標準出力に出力されます。"" (無効) オプションでは、空行が出力されます</dd>
<dt><em>cfgfile</em></dt>
<dd>unboundの設定を読み込む設定ファイル。このファイルが検査されます。省略したら、デフォルトの場所の設定ファイルが検査されます。</dd>
</dl>
<h2>終了コード</h2>
<p>unbound-checkconfプログラムはエラーのときにはステータスコード1で、正しい設定ファイルのときにはステータスコード0で終了します。 </p>
<h2>ファイル</h2>
<dl compact="compact">
<dt><em>/etc/unbound/unbound.conf</em></dt>
<dd>unboundの設定ファイル。</dd>
</dl>
<h2>関連項目</h2>
<p><em><a href="../unbound.conf/">unbound.conf</a></em>(5), <em><a href="../unbound/">unbound</a></em>(8).</p>
<hr />
