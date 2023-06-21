<script>

export default {
    name: "AppCheckout"
}
</script>

<template>
    <section id="checkout">
        <div class="container-sm py-5">
            <div class="row mt-2 gx-4 gy-4 gy-lg-0">
                <!-- Riepilogo prodotti nel carrello/ordine -->
                <div class="col-12 col-lg-6">
                    <div class="ms_form-content border h-100 rounded-3 d-flex flex-column">
                        <div class="form-title p-3">
                            <h3 class="m-0 fw-bold">Riepilogo ordine ({{ new Date().toLocaleDateString() }})
                            </h3>
                        </div>

                        <hr class="m-0" />

                        <div class="ms_order-items-content d-flex flex-column p-3 gap-3">
                            <div class="ms_card">
                                <div class="row ms_card-row">
                                    <!-- Immagine prodotto -->
                                    <div class="col-4 h-100">
                                        <img src="menu_1_1-1.png" class="rounded-start" alt="image" />
                                    </div>
                                    <div class="col-8 h-100 ps-0">
                                        <div class="ms_card-body d-flex align-items-center h-100 ps-0">
                                            <div class="card-details">
                                                <!-- Nome prodotto -->
                                                <h5 class="card-title m-0">Petto di pollo</h5>
                                                <!-- Quantità prodotto -->
                                                <small class="fst-italic m-0">Quantità: 1</small>
                                                <!-- Costo prodotto -->
                                                <span class="text-success fw-bold me-2 d-block d-sm-none">€19,99</span>
                                            </div>

                                            <div class="item-price-delete d-flex align-items-center ms-auto">
                                                <span class="text-success fw-bold me-2 d-none d-sm-block">€19,99</span>

                                                <!-- cestino per rimuovere l'elemento dall'ordine/carrello -->
                                                <button class="btn border-0 ms-auto">
                                                    <i class="fa-regular fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row ms_card-row">
                                    <!-- Immagine prodotto -->
                                    <div class="col-4 h-100">
                                        <img src="menu_1_2.png" class="rounded-start" alt="image" />
                                    </div>
                                    <div class="col-8 h-100 ps-0">
                                        <div class="ms_card-body d-flex align-items-center h-100 ps-0">
                                            <div class="card-details">
                                                <!-- Nome prodotto -->
                                                <h5 class="card-title m-0">Boccia de vino</h5>
                                                <!-- Quantità prodotto -->
                                                <small class="fst-italic m-0">Quantità: 1</small>
                                                <!-- Costo prodotto -->
                                                <span class="text-success fw-bold me-2 d-block d-sm-none">€19,99</span>
                                            </div>

                                            <div class="item-price-delete d-flex align-items-center ms-auto">
                                                <span class="text-success fw-bold me-2 d-none d-sm-block">€9,99</span>

                                                <!-- cestino per rimuovere l'elemento dall'ordine/carrello -->
                                                <button class="btn border-0 ms-auto">
                                                    <i class="fa-regular fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="m-0 mt-auto" />
                        <!-- Importo totale -->
                        <h3 class="text-end mb-0 p-3 fw-regular">
                            Totale: <span class="text-success fw-bold">€29,98</span>
                        </h3>
                    </div>
                </div>

                <!-- Box form dati utente -->
                <div class="col-12 col-lg-6 position-relative">
                    <!-- LOADER PROCESSO ORDINE
                    <div
                        class="ms_driver-loader position-absolute top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-start">
                        <img src="logo.gif" alt="Loading" />
                    </div>
                    -->

                    <div class="ms_form-content border rounded-3">
                        <div class="form-title p-3">
                            <h3 class="m-0 fw-bold">Inserisci i dati per la consegna</h3>
                        </div>

                        <hr class="m-0" />

                        <form class="p-3" method="POST">
                            <!-- Insermiento del nome dell'utente -->
                            <div class="mb-3">
                                <label for="customer_name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="customer_name" />
                                <div class="invalid-feedback">
                                    Name
                                </div>
                            </div>
                            <!-- Insermiento del cognome dell'utente -->
                            <div class="mb-3">
                                <label for="customer_surname" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="customer_surname" />
                                <div class="invalid-feedback">
                                    Surname
                                </div>
                            </div>
                            <!-- Insermiento indirizzo dell'utente -->
                            <div class="mb-3">
                                <label for="customer_address" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="customer_address" />
                                <div class="invalid-feedback">
                                    Indirizzo
                                </div>
                            </div>
                            <!-- Insermineto email dell'utente -->
                            <div class="mb-3">
                                <label for="customer_mail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="customer_mail" />
                                <div class="invalid-feedback">
                                    Email
                                </div>
                            </div>
                            <!-- Insermineto del numero di telefono dell'utente -->
                            <div class="mb-3">
                                <label for="customer_phone_number" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="customer_phone_number" maxlength="11" />
                                <div class="invalid-feedback">
                                    Phone
                                </div>
                            </div>

                            <button id="submit-button" type="submit" class="btn w-100 rounded-pill text-white">Invia
                                l'ordine</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";

section {
    background-image: url(back1.jpg);

    & .ms_form-content {
        background-color: $secondary-color;
        color: $primary-color;

        & .ms_order-items-content {

            & .ms_card {
                background-color: $secondary-color;

                & .ms_card-row {
                    height: max(90px, 80px);
                    margin: 5px 0;
                    background-color: $color-white;
                    border-radius: 5px;

                    & .ms_card-body {
                        color: $secondary-color;
                    }
                }
            }
        }
    }
}

.ms_driver-loader {
    padding: inherit;
    z-index: 1001;

    &>img {
        object-fit: contain;
        width: 50%;
    }
}

img {
    width: 100%;
    min-height: 80px;
    height: 100%;
    object-fit: cover;
}

.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    display: inline-block;
}

#submit-button {
    background-color: $primary-color;
}
</style>
