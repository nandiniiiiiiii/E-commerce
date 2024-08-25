import AdminProductDetail from "../features/admin/AdminProductDetail";
import NavBar from '../features/navbar/NavBar'

function AdminProductDetailPage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductDetail/>
            </NavBar>
        </div>
     );
}

export default AdminProductDetailPage;