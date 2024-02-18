---
title: Unbound
sidebar:
    order: 1
---

<p>UnboundはDNSリゾルバ、キャッシュ、DNSSEC検証機能を持つDNSキャッシュサーバーです。次のような特徴を持ちます。</p>
<ul>
<li>DNSSEC対応</li>
<li>DNSキャッシュ汚染に対する耐性が強い</li>
<li>設定が容易である（デフォルトで安全な設定ができる）</li>
<li>高性能</li>
<li>IPv4、IPv6デュアルスタック</li>
</ul>
<p>UnboundはBSDライセンスの元で公開されています。</p>

<h3>DNSラウンドロビン対応について</h3>
<p>Unboundは最初のバージョンからDNSラウンドロビンにずっと対応していませんでした。しかし、Unbound 1.4.17においてDNSラウンドロビンに対応しました。unbound.confにおいて"rrset-roundrobin: yes"を設定すると有効になります。</p>

<h3>文書</h3>
<ul>
<li><a href="howto_setup/">インストールと設定方法</a></li>
<li><a href="howto_anchor/">DNSSECを有効にするには</a></li>
<li><a href="howto_turnoff_dnssec/">DNSSECを無効にするには</a></li>
<li><a href="howto_optimise/">最適化の方法</a></li>
<li><a href="packages/">ソフトウェアパッケージ</a></li>
<li><a href="performance/">性能</a></li>
</ul>

<h3>マニュアル</h3>
<ul>
<li><a href="unbound/">unbound(8)</a></li>
<li><a href="unbound-checkconf/">unbound-checkconf(8)</a></li>
<li><a href="unbound.conf/">unbound.conf(5)</a></li>
<li><a href="unbound-host/">unbound-host(1)</a></li>
<li><a href="unbound-control/">unbound-control(8)</a></li>
<li><a href="unbound-anchor/">unbound-anchor(8)</a></li>
</ul>

<a name="reference"></a>
<h3>資料</h3>
<ul>
<li><a href="http://www.slideshare.net/ttkzw/unboundnsdosc-2013-tokyospring-16708977">Unbound/NSD最新情報（OSC 2013 Tokyo/Spring）</a></li>
<li>2011年3月4日 オープンソースカンファレンス2011 Tokyo/Spring セミナー資料<ul>
<li><a href="http://unbound.jp/wp/wp-content/uploads/2011/04/Unbound-osc2011tk-introduction.pdf">Unboundの紹介(PDF)</a></li>
<li><a href="http://unbound.jp/wp/wp-content/uploads/2011/04/Unbound-osc2011tk-optimize.pdf">Unboundの最適化(PDF)</a></li>
<li><a href="http://unbound.jp/wp/wp-content/uploads/2011/04/Unbound-osc2011tk-dnssec.pdf">UnboundとDNSSEC(PDF)</a></li></li></ul>
<li><a href="/wp/wp-content/uploads/2010/09/unbound-dnsops.jp-bof-20081125.pdf">Unboundの紹介(PDF)</a>（2008年11月25日 DNSOPS.JP BoF発表資料）</li>
<li><a href="http://www.atmarkit.co.jp/flinux/special/unbound/unbounda.html">DNSリゾルバのニューフェイス「Unbound」 (@IT)</a> (2008年11月17日)</li>
<li><a href="http://gihyo.jp/admin/feature/01/unbound">Unbound，知ってる？　この先10年を見据えたDNS (gihyo.jp)</a> (2008年11月12日)</li>
</ul>
