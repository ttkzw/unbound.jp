---
title: ldns
---
<p>ldnsの目的はDNSプログラミングを簡単にすることです。DNSSEC文書のような最近のRFCをサポートしています。開発者が現在のRFCに従ったソフトウェアや現在のインターネットドラフトの実験的なソフトウェアを簡単に作成できるようにします。ldnsを使う2番目の利点は速度です。ldnsはCで書かれており、Perlよりも遙かに速いです。</p>
<p>ldnsを使った最初の主要なツールはdrillです。ライブラリの一部として取得できます。バージョン1.0.0からはdrillはldnsリリースに含まれています。もはや、個別には配布されません。そのバージョン番号はldnsのバージョンに従います。ライブラリには使い方を示すいくつかの例とツールが含まれています。</p>
<p>ldnsは暗号関数としてOpenSSLに依存しています。OpenSSLなしにコンパイルすることもできますが、暗号の機能を実行する能力を失うことになります。</p>

<h3>機能</h3>
<ul>
<li>IP4とIP6サポート</li>
<li>TSIGサポート</li>
<li>DNSSECサポート; 署名と検証</li>
<li>小さいサイズ</li>
<li>マニュアルページとオンライン文書</li>
</ul>
</p>

<h3>マニュアル</h3>
<p>ldnsについてのドキュメントは<a href="http://www.nlnetlabs.nl/projects/ldns/doc/index.html">ldns documentation</a>(NLnet Labs)を参照してください。</p>
<p>付属のツールのドキュメントはこのページの後半のリンクをたどってください。</p>

<h3>ダウンロード</h3>
<p>NLnet labsの<a href="http://www.nlnetlabs.nl/projects/ldns/">ldns</a>からダウンロードできます。</p>

<h2>drill</h2>
<ul>
<li><a href="drill/">drill</a> - DNSおよびDNSSECから（デバッグ）情報を取得するツール</li>
</ul>

<h2>サンプルプログラム</h2>
<p>以下のツールはldnsの利用を利用したサンプルプログラムです。</p>
<ul>
<li><a href="ldns-chaos/">ldns-chaos</a></li>
<li><a href="ldns-compare-zones/">ldns-compare-zones</a></li>
<li><a href="ldns-dpa/">ldns-dpa</a></li>
<li><a href="ldns-key2ds/">ldns-key2ds</a></li>
<li><a href="ldns-keyfetcher/">ldns-keyfetcher</a></li>
<li><a href="ldns-keygen/">ldns-keygen</a></li>
<li><a href="ldns-mx/">ldns-mx</a></li>
<li><a href="ldns-notify/">ldns-notify</a></li>
<li><a href="ldns-nsec3-hash/">ldns-nsec3-hash</a></li>
<li><a href="ldns-read-zone/">ldns-read-zone</a></li>
<li><a href="ldns-resolver/">ldns-resolver</a></li>
<li><a href="ldns-revoke/">ldns-revoke</a></li>
<li><a href="ldns-rrsig/">ldns-rrsig</a></li>
<li><a href="ldns-signzone/">ldns-signzone</a></li>
<li><a href="ldns-testns/">ldns-testns</a></li>
<li><a href="ldns-update/">ldns-update</a></li>
<li><a href="ldns-verify-zone/">ldns-verify-zone</a></li>
<li><a href="ldns-version/">ldns-version</a></li>
<li><a href="ldns-walk/">ldns-walk</a></li>
<li><a href="ldns-zcat/">ldns-zcat</a></li>
<li><a href="ldns-zsplit/">ldns-zsplit</a></li>
<li><a href="ldnsd/">ldnsd</a></li>
</ul>
