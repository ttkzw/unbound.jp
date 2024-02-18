---
title: ldns-verify-zone(1)
---
<h1>ldns-verifyzone</h1>
<p>Section: User Commands (1)<br />Updated: 27 May 2008<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-verify-zone - DNSSEC署名済みゾーンを読んで検証する。</p>
<h2>書式</h2>
<p><strong>ldns-verify-zone</strong> <em>ZONEFILE</em></p>
<h2>説明</h2>
<p><strong>ldns-verify-zone</strong>はDNSゾーンファイルを読んで検証します。</p>
<p>RRSIGリソース レコードはゾーン頂点でのDNSKEYセットに対して確認されます。</p>
<p>きちんと合えば、それぞれの名前はNSEC(3)で確認されます。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-h</strong></dt>
<dd>使い方を表示して、終了します。</dd>
<dt><strong>-v</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
<dt><strong>-V</strong> <em>number</em></dt>
<dd>饒舌さのレベルを設定します。デフォルトは3です:
<p><br />
&nbsp;0:&nbsp;静かにする<br />&nbsp;1:&nbsp;結果とエラーを出力する<br />&nbsp;2:&nbsp;今は1と同じ<br />&nbsp;3:&nbsp;結果とエラーと確認された名前を出力します<br />&nbsp;&nbsp;&nbsp;&nbsp;<br />&nbsp;4:&nbsp;今は3と同じ<br />&nbsp;5:&nbsp;読み込んだ後にゾーンを出力し、<br />&nbsp;&nbsp;&nbsp;&nbsp;結果とエラーと確認された名前を出力します</p>
</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2008 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
