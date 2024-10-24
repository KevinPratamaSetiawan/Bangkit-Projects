/**
 * TODO
 * Selesaikan kode pembuatan class Inventory dengan ketentuan:
 * - Memiliki properti `items` untuk menampung daftar item dalam bentuk array.
 * - Memiliki method `addItem` untuk menambahkan item ke properti `items`.
 * - Memiliki method `removeItem` untuk menghapus item berdasarkan `id`.
 * - Memiliki method `listItems` untuk mengembalikan string yang merupakan informasi detail barang (dipanggil dari fungs `item.displayDetails()`).
 */

class Inventory {
    constructor() {
        this.items = [];
    }

    addItem (item) {
        this.items.push(item);
    }

    removeItem (id) {
        const index = this.items.findIndex(item => item.ID === id);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    listItems () {
        let outputText = '';
        for(let i=0;i<this.items.length;i++){
            outputText += this.items[i].displayDetails() + '\n';
        }

        return outputText;
    }
}


// Jangan hapus kode di bawah ini!
export default Inventory;
