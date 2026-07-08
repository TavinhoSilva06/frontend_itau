import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NovaTransacao from "../pages/NovaTransacao";
import Configuracao from "../pages/Configuracao";
import Historico from "../pages/Historico";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="/nova-transacao"
                    element={<NovaTransacao />}
                />

                <Route
                    path="/configuracao"
                    element={<Configuracao />}
                />

                <Route
                    path="/historico"
                    element={<Historico />}
                />

            </Routes>

        </BrowserRouter>

    );

}