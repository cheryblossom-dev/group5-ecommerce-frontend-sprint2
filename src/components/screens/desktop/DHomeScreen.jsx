import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'

function DHomeScreen() {
    return (
        <>
            <h1>hello world</h1>
            <Card />
            <Link to="catalog">Catalog</Link>
            <br />
            <Link to="/product/:id">productdetail test</Link>
        </>
    )
}

export default DHomeScreen
