var tpl_userOrderCartSettle =
`
<div class="settlement" id="U-cart" style="bottom: 0px;">
    <script type="text/html" id="U-cartData">
	<div class="flex-fixed b-radio checked">
    <label class="checkAll">
        <span><em class=""></em>全选</span>
        <input type="checkbox" id="J-selectAll">
    </label>
	</div>
    <button class="btnStyle btn1 fr" id="J-submitCheckout">结　算</button>
    <div class="data">
        合计 <b id="J-Cart-totalPrice">￥0</b><br/>
        共<span id="J-Cart-totalNum">0</span>件
</div>
`

export default tpl_userOrderCartSettle;