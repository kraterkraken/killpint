// function initExtension()
// {
//     alert("Initializing KillPint.");
// }
//


function killPinterest(details)
{
    console.log("KillPint: before loading google.com search results -->" + details.url);
    let urlComponents = details.url.split("?");
    let queryStringParams = new URLSearchParams(urlComponents[1]);
    let googleSearch = queryStringParams.get("q");
    console.log("KillPint: search string is: " + googleSearch);

    googleSearch += " -site:pinterest.com";
    console.log("KillPint: new search string is: " + googleSearch);

    queryStringParams.set("q", googleSearch);
    let redirectUrl = urlComponents[0] + "?" + queryStringParams.toString();
    console.log("KillPint: redirecting to: " + redirectUrl);

    return {"redirectUrl": redirectUrl};
}


// chrome.runtime.onInstalled.addListener(initExtension);


chrome.runtime.onInstalled.addListener(() => {
  console.log("KillPint loaded.");
});

chrome.webNavigation.onBeforeNavigate.addListener(killPinterest,
    {url:
        [
            {hostSuffix: 'www.google.com'},
            {queryPrefix: 'search?'}
        ]
    }
);
