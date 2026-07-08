import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    PlusCircle,
    Settings,
    History
} from "lucide-react";

export default function Sidebar() {

    return (

        <aside
            className="bg-slate-900 text-white w-64 min-h-screen p-6"
        >

            <nav
                className="flex flex-col gap-6"
            >

                <NavLink
                    to="/"
                    className="flex items-center gap-3 hover:text-orange-400"
                >
                    <LayoutDashboard />
                    Dashboard
                </NavLink>

                <NavLink
                    to="/nova-transacao"
                    className="flex items-center gap-3 hover:text-orange-400"
                >
                    <PlusCircle />
                    Nova Transação
                </NavLink>

                <NavLink
                    to="/configuracao"
                    className="flex items-center gap-3 hover:text-orange-400"
                >
                    <Settings />
                    Configuração
                </NavLink>

                <NavLink
                    to="/historico"
                    className="flex items-center gap-3 hover:text-orange-400"
                >
                    <History />
                    Histórico
                </NavLink>

            </nav>

        </aside>

    );

}