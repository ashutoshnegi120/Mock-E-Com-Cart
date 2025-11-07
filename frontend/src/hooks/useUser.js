import { useState, useEffect } from "react";

export default function useUser() {
    const [user, setUser] = useState("");

    useEffect(() => {
        const savedUser = localStorage.getItem("cartUser");
        if (savedUser) {
            setUser(savedUser);
        } else {
            const name = prompt("👋 Welcome! Please enter your name or email to continue:");
            if (name && name.trim()) {
                localStorage.setItem("cartUser", name.trim());
                setUser(name.trim());
            }
        }
    }, []);

    return user;
}
