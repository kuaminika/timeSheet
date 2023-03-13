var app = app||{};
// this shall contain code to load templates
(function(appTing)
{
    function populateTopBar(tmpParent)
    { 
        console.log("tmpParent",tmpParent); 
        let tmplt= tmpParent.getElementsByTagName("inside-top-bar")[0];
        let topBarHolder = document.getElementById("topBarHolder");
        topBarHolder.appendChild(tmplt.getElementsByTagName("div")[0]);

        return tmpParent;
    }
    function populateSideBar(tmpParent)
    {  
        console.log("tmpParent",tmpParent);
        let tmplt= tmpParent.getElementsByTagName("inside-side-bar")[0];
        let sidebarHolder = document.getElementById("sidebarHolder");
        sidebarHolder.appendChild(tmplt.getElementsByTagName("div")[0]);
        if(!appTing.currentPage)
            return tmpParent;

        // setting active nav-item
        let navItems = sidebarHolder.getElementsByClassName("nav-item");
        let activeItem = sidebarHolder.getElementsByClassName("nav-item active")[0]||{};
        activeItem.className = "nav-item";
        for(let i = 0; i<navItems.length;i++)
        {
            console.log("comparing",`"${navItems[i].textContent.replace(/\s/,"")}"`,`"${appTing.currentPage}"`,navItems[i].textContent.replace(/\s/,"") == appTing.currentPage)
             if(navItems[i].textContent.replace(/\s/,"") == appTing.currentPage)
             {
                navItems[i].className= "nav-item active";
                break;
             }
                
        }
        return tmpParent;
    }

    function loadViews()
    {
        return fetch("/views/templates.html").then(r=>r.text())
            .then(rawtmplts=>{ 
                let tmpltes= document.createRange().createContextualFragment(rawtmplts);
                
                let tmpParent  = document.createElement("div");
                tmpParent.append(tmpltes);
                console.log("tmpParent",tmpParent);
                return tmpParent;

            })
            .then(populateTopBar)
            .then(populateSideBar);
    }
    appTing.loadTemplates = loadViews;
})(app);