import {moneyFormat} from "../helpers";

function Header({money, total}) {
    const priceSplitter = (money) => (money && money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));

    return (
        <div className="header">
            {total > 0 && money - total !== 0 && (
                <>
                    Harcayacak {priceSplitter(money - total)} $'ınız kaldı.
                </>
            )}
            {total === 0 && (
                <>
                    Harcamak için {priceSplitter(money)} $'ınız var.
                </>
            )}
            {money - total === 0 && (
                <>
                    Paranız bitti.
                </>
            )}

        </div>
    )


}

export default Header