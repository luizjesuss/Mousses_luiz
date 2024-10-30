const menu = document.getElementById("menu")
const bttcart = document.getElementById("cart-btn")
const modalcart = document.getElementById("modal-cart")
const cartitems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const Checkout = document.getElementById("final-ped")
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

// Monitorando alterações no campo de endereço
endereço.addEventListener("input", function(event) {
    let inputValue = event.target.value;

    // Oculta o aviso quando o usuário começa a digitar
    if (inputValue !== "") {
        document.getElementById("address-warn").style.display = "none";
    }
})

Checkout.addEventListener("click", function() {

    const isOpen = Lojaopen();
    if(!isOpen){
        
        Toastify({
            text: "Restaurante esta fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
        }).showToast();

        return;
    }
    if (cart.length === 0) return;

    // Exibe o aviso se o campo de endereço estiver vazio
    if (endereço.value === "") {
        document.getElementById("address-warn").style.display = "block";
        return;
    }


    //ENVIAR PEDIDO
    const Carrinhoitems = cart.map((item)=> {
        return (
        `   
        ${item.name} 
        quantidade: (${item.quantity}) 
        preço: R$${item.price}
        ------------------------------------ 
        `
        )
    }).join("")
    const message = encodeURIComponent(Carrinhoitems)
    const phone = "92984456712"
    window.open(`https://wa.me/${phone}?text=${message} Endereço:${endereço.value}`, "_blank")
})

// Função para verificar o horário de funcionamento
function Lojaopen() {
    const data = new Date();
    const hora = data.getHours();
    return hora >= 9 && hora < 20; // Retorna true se estiver entre 9h e 20h
}

const spanitem = document.getElementById("Horario");
const isopen = Lojaopen();

if (isopen) {
    spanitem.style.backgroundColor = "green";
} else {
    spanitem.style.backgroundColor = "red";
}
