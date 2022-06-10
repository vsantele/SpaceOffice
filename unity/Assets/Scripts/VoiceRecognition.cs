using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Windows.Speech;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

public class VoiceRecognition : MonoBehaviour
{
    KeywordRecognizer keywordRecognizer;
    Dictionary<string, System.Action> keywords = new Dictionary<string, System.Action>();
    // Start is called before the first frame update
    void Start()
    {
        //Create keywords for keyword recognizer
        keywords.Add("météo", () =>
        {
            Debug.Log("météo");
            // action to be performed when this keyword is spoken
            //GameObject.Find("astro").GetComponent<Player>().CreateWeather();
            GameObject.Find("astro").GetComponent<Player>().NewData("weather", GameObject.Find("astro").GetComponent<Player>().actualData);
        });
        keywords.Add("suivre", () =>
        {
            Debug.Log("suivre");
            new InitScript().FollowMe();
        });
        keywords.Add("viens", () =>
        {
            Debug.Log("viens");
            new InitScript().FollowMe();
        });
        keywords.Add("stop", () =>
        {
            Debug.Log("stop");
            new InitScript().LeaveMe();
        });
        keywords.Add("reste", () =>
        {
            Debug.Log("reste");
            new InitScript().LeaveMe();
        });
        keywords.Add("invocation", () =>
        {
            Debug.Log("invocation");
            new InitScript().SpawnAstro();
        });
        keywords.Add("salut astro", () =>
        {
            Debug.Log("salut astro");
            new InitScript().SpawnAstro();
        });

        keywords.Add("salut val", () =>
        {
            Debug.Log("salut val");
            new InitScript().SpawnAstro();
        });

        keywords.Add("dance", () =>
        {
            Debug.Log("Dance");
            new InitScript().Danse();
        });
        keywords.Add("je suis fatigué", () =>
        {
            Debug.Log("Start coffee");
            MakeCoffe();
        });

        keywordRecognizer = new KeywordRecognizer(keywords.Keys.ToArray());
        keywordRecognizer.OnPhraseRecognized += KeywordRecognizer_OnPhraseRecognized;

        keywordRecognizer.Start();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void KeywordRecognizer_OnPhraseRecognized(PhraseRecognizedEventArgs args)
    {
        System.Action keywordAction;
        // if the keyword recognized is in our dictionary, call that Action.
        if (keywords.TryGetValue(args.text, out keywordAction))
        {
            keywordAction.Invoke();
        }
    }

    private async void MakeCoffe()
    {
        var value = new Dictionary<string, string>
        {
            {"choice", "coffee" }
        };
        HttpClient client = new HttpClient();
        var response = await client.PostAsync("http://10.120.10.30", new FormUrlEncodedContent(value));
        var res=await response.Content.ReadAsStringAsync();
        //if (response.IsSuccessStatusCode)
        //{
        //Debug.Log("Café");
        //} else
        //{
        //    Debug.Log("pas café");
        //    Debug.Log(response.StatusCode.ToString());
        //}
        Debug.Log(res);

    }
}
