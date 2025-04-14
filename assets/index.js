(function () {
    const s = document.createElement("link").relList;
    if (s && s.supports && s.supports("modulepreload"))
        return;

    for (const t of document.querySelectorAll('link[rel="modulepreload"]'))
        c(t);

    new MutationObserver(t => {
        for (const i of t)
            if (i.type === "childList")
                for (const f of i.addedNodes)
                    if (f.tagName === "LINK" && f.rel === "modulepreload")
                        c(f);
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function l(t) {
        const i = {};
        if (t.integrity) i.integrity = t.integrity;
        if (t.referrerPolicy) i.referrerPolicy = t.referrerPolicy;
        if (t.crossOrigin === "use-credentials") i.credentials = "include";
        else if (t.crossOrigin === "anonymous") i.credentials = "omit";
        else i.credentials = "same-origin";
        return i;
    }

    function c(t) {
        if (t.ep) return;
        t.ep = !0;
        const i = l(t);
        fetch(t.href, i);
    }
})();
function v(e) {
    return !e || typeof e != "string" || !e.trim() ? "Please fill in all the fields" : null
}
function L(e) {
    return !e || typeof e != "string" || !e.trim() ? "Please fill in all the fields" : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? null : "Please provide a valid email!"
}
function h(e) {
    return !e || !Array.isArray(e) || !e.length || !e.every(s => typeof s == "string") ? "Please select at least one topic!" : null
}
const n = document.querySelector.bind(document)
    , _ = document.querySelectorAll.bind(document)
    , o = n(".step-1-form")
    , d = n(".step-2-form")
    , p = n(".step-3-form")
    , g = _(".step-2-form__label")
    , y = n(".step-3-form__name")
    , P = n(".step-3-form__email")
    , b = n(".step-3-form__list")
    , m = n(".stepper__step")
    , r = _(".stepper__circle")
    , a = {
        name: "",
        email: "",
        topics: []
    };
    u(1);
    o.addEventListener("submit", e => {
        e.preventDefault();
        const s = new FormData(o)
            , l = v(s.get("name"))
            , c = L(s.get("email"));
        l && alert(l),
        c && alert(c),
        !(l || c) && (a.name = s.get("name"),
        a.email = s.get("email"),
        u(2))
    }
);
    g.forEach(e => {
        e.querySelector("input").addEventListener("change", () => {
            e.classList.toggle("step-2-form__label--checked")
        }
    )
    }
);
d.addEventListener("submit", e => {
    e.preventDefault();
    const l = new FormData(d).getAll("topic")
        , c = h(l);
        if(c) {
            alert(c);
            return
        }
        a.topics = l,
        y.textContent = a.name,
        P.textContent = a.email,
        b.innerHTML = a.topics.map(t => `<li>${t}</li>`).join(""),
        u(3)
}
);
p.addEventListener("submit", e => {
    e.preventDefault(),
    alert("✅ Success"), 
    u(1)
}
);
function u(e) {
    switch (e) {
    case 1:
        o.classList.remove("hidden"),
        d.classList.add("hidden"),
        p.classList.add("hidden"),
        m.textContent = "1",
        r[0].classList.add("stepper__circle--active", "stepper__circle--current"),
        r[1].classList.remove("stepper__circle--active", "stepper__circle--current"),
        r[2].classList.remove("stepper__circle--active", "stepper__circle--current");
        break;
    case 2:
        o.classList.add("hidden"),
        d.classList.remove("hidden"),
        p.classList.add("hidden"),
        m.textContent = "2",
        r[0].classList.add("stepper__circle--active"),
        r[0].classList.remove("stepper__circle--current"),
        r[1].classList.add("stepper__circle--active", "stepper__circle--current"),
        r[2].classList.remove("stepper__circle--active", "stepper__circle--current");
        break;
    case 3:
        o.classList.add("hidden"),
        d.classList.add("hidden"),
        p.classList.remove("hidden"),
        m.textContent = "3",
        r[0].classList.add("stepper__circle--active"),
        r[0].classList.remove("stepper__circle--current"),
        r[1].classList.add("stepper__circle--active"),
        r[1].classList.remove("stepper__circle--current"),
        r[2].classList.add("stepper__circle--active", "stepper__circle--current");
        break
    }
}
