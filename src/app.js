document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Me Udon', img: '1.jpg', price: 25000 },
            { id: 2, name: 'Me Ramen', img: '2.jpg', price: 25000 },
            { id: 3, name: 'Me Pho Bo', img: '3.jpg', price: 20000 },
            { id: 4, name: 'Me Spaghetti', img: '4.jpg', price: 50000 },
        ],
        rupiah(number) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            }).format(number);
        },
        loadData() {
            console.log('Data loaded');
        }
    }));


    Alpine.store('cart',{
        items: [],
        total: 0,
        quantity: 0,
        add(newItem){
            // cek apakah ada barang yang sama di cart

            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika blm ada
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
            }else{
                // jika barangnya udh ada
                this.items = this.items.map((item) => {
                    // jika barang beda
                    if(item.id != newItem.id){
                        return item;
                    }else{
                        // jika barang udh ada, tambah quantity dan sub total
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += newItem.price;
                        return item;
                    }
                })
            }
        },
        remove(id){
            // ambil item yg mau di remove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id)

            // jika item lebih dari 1
            if(cartItem.quantity > 1 ){
                // telusuri satu satu
                this.items = this.items.map((item) => {
                    //jika bukan barang yang di klik
                    if(item.id !== id){
                        return item;
                    }else{
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            }else if(cartItem.quantity === 1){
                // jika barang sisa 1 
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });
});

// form validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for(let i = 0; i < form.elements.length; i++){
        if(form.elements[i].value.length !== 0){
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        }else{
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled')
});

// kirim data tombol checkout di klik
checkoutButton.addEventListener('click', async function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    // const message = formatMessage(objData);

    // minta transaction token menggunakan ajax
    try {
        const response = await fetch('php/placeOrder.php',{
            method: 'POST',
            body: data,
        });
        const token = await response.text();
        // console.log(token)
        window.snap.pay(token);
    } catch (err) {
        console.log(err.message)
    }
})

// format ke wa
const formatMessage = (obj) => {
    return `Data Customer
Nama : ${obj.name}
Email : ${obj.email}
No HP : ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)})`).join('\n')}

Total : ${rupiah(obj.total)}

Terima Kasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
}