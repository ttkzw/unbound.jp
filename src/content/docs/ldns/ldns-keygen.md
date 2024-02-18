---
title: ldns-keygen(1)
---
<h1>ldns-keygen</h1>
<p>Section: User Commands (1)<br />Updated: 27 May 2008<br /></p>
<hr />
<h2>名前</h2>
<p>ldns-keygen - DNSSEC鍵ペアを生成する</p>
<h2>書式</h2>
<p><strong>ldns-keygen</strong> [ <em>OPTION</em> ] <em>DOMAIN</em></p>
<h2>説明</h2>
<p><strong>ldns-keygen</strong>は秘密鍵/公開鍵の鍵ペアを生成するために使われます。実行時に、3つのファイルを生成します。これは、公開DNSKEYを持つ.keyファイル、秘密鍵データを持つ.privateファイル、DNSKEYレコードのDSレコードを持つ.dsファイルです。</p>
<p>これらのファイルのベース名を出力します。ベース名はK&lt;name&gt;+&lt;alg&gt;+&lt;id&gt;の形式です。</p>
<h2>オプション</h2>
<dl compact="compact">
<dt><strong>-a</strong> <em>&lt;algorithm&gt;</em></dt>
<dd>このアルゴリズムで鍵を生成します。'list'を与えると、サポートしているアルゴリズムの一覧が表示されます。（古いバージョンや他のソフトウェアから来ている）別名もサポートしています。その一覧はRFCから名前を得られます。アルゴリズム番号も使えます。</dd>
<dt><strong>-b</strong> <em>&lt;bits&gt;</em></dt>
<dd>鍵長にこのビット数を使います。</dd>
<dt><strong>-k</strong></dt>
<dd>鍵署名鍵（KSK）を生成します。これは.keyファイルのDNSKEY RRに256の代わりに257をフラグとして設定します。</dd>
<dt><strong>-r</strong> <em>device</em></dt>
<dd>ldns-keygenに乱数生成器としてこのファイルを使わせます。これはデフォルトは/dev/randomです。</dd>
<dt><strong>-v</strong></dt>
<dd>バージョンを表示して、終了します。</dd>
</dl>
<h2>著者</h2>
<p>ldnsの使い方の例として、ldnsチームにより書かれました。</p>
<h2>バグの報告の仕方</h2>
<p>&lt;ldns-team@nlnetlabs.nl&gt;にバグを報告してください。</p>
<h2>著作権</h2>
<p>Copyright (C) 2005-2008 NLnet Labs. これはフリーソフトウェアです。無保証です。特定の目的のためへの品質や適合さえありません。</p>
<hr />
