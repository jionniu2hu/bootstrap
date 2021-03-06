//获取购物车数据
var cart = new ShoppingCart();
var cartRoot = document.querySelector('#cartRoot');
const dataNameJson = {
    "price": "[data-name='imgSrc']",
    "qty": "[data-name='qty']",
    "imgSrc": "[data-name='imgSrc']",
    "subPrice": "[data-name='subPrice']",
    "selectedQty": "[data-name='selectedQty']",
    "selectedAmount": "[data-name='selectedAmount']",
    "units": "[data-name='units']"
};

const operatorNameJso = {
    "checkItem": "[data-operator='checkItem']",
    "increase": "[data-operator='increase']",
    "decrease": "[data-operator='decrease']",
    "deleteItem": "[data-operator='deleteItem']"
};

const operatorGlodal = {
    "clearAll": "[data-operator='clearAll']",
    // "deleteSelected": "[data-operator='deleteSelected']"
}
// console.log(cart);
// console.log(cart.getDataFromLocalStorage());

// 本地存储的购物车数据呈现到购物车列表页
function displayOrderList() {
    // 获取购物车数据
    let cartDate = cart.getDataFromLocalStorage();
    // 获取购物车订单列表
    let orderList = cartDate.orderList;
    if (orderList.length == 0) {
        return;
    }
    // 找订单列表的父元素
    let cartList = document.querySelector('#cartList');
    // 找样本节点
    let exmapleNode = document.querySelector('#orderExample');
    // 遍历订单列表(1)
    for (let i in orderList) {
        // 当前订单数据
        let order = orderList[i];
        // console.log(order);
        //拷贝样本节点形成当前订单节点
        node = exmapleNode.cloneNode(true);
        // 挂接到父元素   
        cartList.appendChild(node);
        // 设置数据、节点id
        node.id = order.id;
        // 图像地址、找图像节点
        let imgNode = node.querySelector('[data-name="imgSrc"]');
        imgNode.src = 'images/' + order.imgSrc;
        // console.log(imgNode);



        // 设选中状态、找选中节点
        let checkItemNode = node.querySelector('[data-operator="checkItem"]');
        checkItemNode.checked = order.selectSratus;
        // console.log(checkItemNode);
        // console.log(node);

        let titleNode = node.querySelector('[data-name="title"]');
        titleNode.textContent = orderList[i].title;

        let priceNode = node.querySelector('[data-name="price"]');
        priceNode.textContent = orderList[i].price;

        let qtyNode = node.querySelector('[data-name="qty"]');
        qtyNode.textContent = orderList[i].qty;

        let subPriceNode = node.querySelector('[data-name="subPrice"]');
        subPriceNode.textContent = orderList[i].price;

        // 移除当前订单节点到隐藏属性
        node.classList.remove('d-none');
        // console.log(node);


        // 克隆一个样本节点
        // 设置一个新id
        // 挂接到父元素   
        // 获取所有到数据节点data - name 依次将对应到数据送入节点对应属性
        // 移除新节点到隐藏属性 d - none
    }
    // 遍历订单列表(2)
    // for (let i = 0; i < orderList.length; i++) {
    //     let order = orderList[i];
    //     console.log(order);
    // }
}

//显示商品总样本数
//显示已选中商品道总件数和总价格
function displaySelectedTotal() {

    let totalNode = cartRoot.querySelector(dataNameJson.units);
    totalNode.textContent = cart.getTotalUnits();

    totalNode = cartRoot.querySelector(dataNameJson.selectedQty);
    totalNode.textContent = cart.getSelectedQty();

    totalNode = cartRoot.querySelector(dataNameJson.selectedAmount);
    totalNode.textContent = (cart.getSelectedAmount()).toFixed(2);
    // 删除选中商品
    element = node.querySelector(operatorNameJso.deleteItem);
    element.setAttribute("data-id", order.id);
    console.log(element);
}

// 为相关节点注册事件
function regEvent() {
    // 获取清空购物车节点
    let element = cartRoot.querySelector(operatorGlodal.clearAll);
    console.log(element);
    // 注册点击事件触发函数
    element.onclick = clearAllEventFun;


    // 获取删除购物车节点
    let deleteid = cartRoot.querySelector(operatorNameJso.deleteItem);
    console.log(deleteid);
    // 注册点击事件触发函数
    element.onclick = clearAllEventFun;
    // deleteid.onclick = deleteSelectedEventFun;
}

// 清空触发函数
function clearAllEventFun() {
    cart.clearCart();
    displayOrderList();
    // 获取订单根节点
    let cartListNode = document.querySelector('#cartList');
    //保留样本节点
    let ExampleNode = (document.querySelector('#orderExample')).cloneNode(true);
    //清除订单根节点的所有元素
    cartListNode.innerHTML = "";
    //将样本节点挂接回列表根节点
    cartListNode.appendChild(ExampleNode);
    // 更新商品总数据
    displaySelectedTotal();
    console.log('清空');
}

// 删除当前商品的触发函数
function deleteItemEventFun(e) {
    let id = e.getattr.getAttribute("data-id");
    // 删除购物车数据
    cart.deleteItem(id);
    let orderNode = cartList.getSelectedAmount(id);
    cartList.removeChild(orderNode);
    displaySelectedTotal();
}

// 初始化函数
function init() {
    // 显示订单列表
    displayOrderList();
    // 显示总数据
    displaySelectedTotal();
    // 为所有操作节点注册事件
    regEvent();

}
// 调用初始化函数
init()