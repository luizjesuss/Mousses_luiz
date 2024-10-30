const menu = document.getElementById("menu")
const bttcart = document.getElementById("cart-btn")
const modalcart = document.getElementById("modal-cart")
const cartitems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const Checkout = document.getElementsByClassName("final-ped")
const closecart = document.getElementById("close")
const cartCount = document.getElementById("cart-count")
const endereço = document.getElementById("address")
const endereçoWarn = document.getElementById("address-warn")

let cart = []

//abrir modal do carrinho
bttcart.addEventListener("click", function()
{
    modalcart.style.display = "flex"
})

//fechar modal do carrinho
closecart.addEventListener("click",function(){
    modalcart.style.display= "none"
})

//Receber valor de item selecionado
menu.addEventListener("click", function(event){
  let parentButton = event.target.closest(".bttitem")
  
  if(parentButton){
    const name = parentButton.getAttribute("data-name")
    const price = parseFloat(parentButton.getAttribute("data-price"))
    addTocart(name,price)
  }

})
//Função para adc carrinho
function addTocart(name,price){
    const existingItem = cart.find(Item=> Item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{
    cart.push({
        name,
        price,
        quantity:1
    })
}
updatecartmodal()
}

//atualiza carrinho
function updatecartmodal(){
    cartitems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const cartitemselement = document.createElement("div")
        cartitemselement.classList.add("flex")
        cartitemselement.style.display = "flex";
        cartitemselement.style.alignItems = "center";
        cartitemselement.style.flexDirection = "column";
        cartitemselement.style.margin = "0px"
        
        cartitemselement.innerHTML= `
        <div style = "display: flex; align-items: center; justify-content: space-between; width:100%; margin: 0">
            <div>
             <p style= "font-weight: 500">${item.name}</p>
             <p>Qtd: ${item.quantity}</p>
             <p style= "font-weight: 500;margin-top: 8px">R$ ${item.price.toFixed(2)}</p>
            </div>
                 <button class = "remove-from-cart" data-name="${item.name}">
                 Remover
                 </button>
        </div>
        `
        total += item.price * item.quantity

        cartitems.appendChild(cartitemselement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency:"BRL"});

        cartCount.innerHTML = cart.length;
}

//fução para remover item
cartitems.addEventListener("click", function(event){
    if(event.target.classList.contains ("remove-from-cart")){
        const name = event.target.getAttribute("data-name")
        removerItemCart(name);
    }
})

function removerItemCart(name){
    const index = cart.findIndex(item => item.name ===name);

    if(index !== -1){
       const item = cart[index]
       console.log(item) 

       if(item.quantity > 1){
        item.quantity -= 1;
        updatecartmodal();
        return;
       }
       cart.splice(index, 1 );
       updatecartmodal();

    }
}

// Monitora alterações no campo de endereço
endereço.addEventListener("input", function(event) {
    let inputValue = event.target.value;

    // Oculta o aviso quando o usuário começa a digitar
    if (inputValue !== "") {
        endereçoWarn.classList.add("none");
    }
});

Checkout.addEventListener("click", function() {
    if (cart.length === 0) return;

    // Exibe o aviso se o campo de endereço estiver vazio
    if (endereço.value === "") {
        endereçoWarn.classList.remove("none");
    }
});
