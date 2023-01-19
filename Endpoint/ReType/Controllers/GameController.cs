using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReType.data;
using ReType.Dtos;
using ReType.Model;
using System.Security.Claims;
using System.Text.RegularExpressions;

namespace ReType.Controllers
{
    [Route("api")]
    [ApiController]
    public class GameController : Controller
    {
        private readonly IWebAPIRepo _repository;

        public GameController(IWebAPIRepo repository)
        {
            _repository = repository;
        }
        [Authorize]
        [Authorize(Policy = "UserOnly")]
        [HttpPost("ArticleChoose")]
        public ActionResult<Article_Choose_output> ArticleChoose(Article_Choose choose) //API
        {

            Article c = _repository.ChooseArticle(choose.Difficulty, choose.Type);
            if (c != null)
            {
                Article_Choose_output output = new Article_Choose_output { ID = c.Id, Article = c.WholeArticle, ErrorRemain = _repository.WrongWordList(c.Id).Count() };
                return Ok(output);
            }
            else
            {
                return NotFound();
            }
        }
        [Authorize]
        [Authorize(Policy = "UserOnly")] //Vaild user login
        [HttpPost("ArticleProcess")]
        public ActionResult<Article_Process_out> ArticleProcess(Article_Process Article)
        {
            ClaimsIdentity ci = HttpContext.User.Identities.FirstOrDefault();
            Claim claim = ci.FindFirst("UserName");
            string username = claim.Value; //验证登录
            string pattern1 = @"[A-Za-z]*(?i:"; //初始化正则
            string pattern3 = ")+[A-Za-z]*";//初始化正则
            string inputreplace = "";
            Match mc2 = Regex.Match(Article.Input, "[A-Za-z]+"); //删除空白，多余的东西
            if (mc2.Value != "")
            {
                inputreplace = mc2.Value;
            }
            else
            {
                inputreplace = "sfgvbadfvbhaidfgvbadfvagarfgsdfgvfdvdfvfvdfsbvb";
            }

            Regex inputrgx = new Regex(".+");
            Article.Input = inputrgx.Replace(Article.Input, inputreplace); //删除空白，多余的东西
            string[] wronglist = _repository.WrongWordList(Article.ArticleID); //错误单词列表
            string[] correctlist = _repository.CorrectWordList(Article.ArticleID); //正确单词列表
            string pattern = pattern1 + Article.Input + pattern3;
            string replacement = "<span style=\"color: LightGray;\">$&</span>";
            Regex rgx = new Regex(pattern);

            int articlediff = _repository.articlediff(Article.ArticleID);
            string already = Article.AlreadyCorrect;
            string articlecopy = Article.Article;
            int wrong = 1;
            for (int i = 0; i < wronglist.Length; i++)
            {
                if (wronglist[i].ToUpper() == Article.Input.ToUpper() && Article.Enter == 1) //Input correct wrong word
                {
                    int error_remain = wronglist.Count();
                    if (already != "")
                    {
                        error_remain = wronglist.Count() - already.Split(',').Count() / 2;

                    }
                    wrong = 0;
                    string result = rgx.Replace(Article.Article, replacement);
                    Article_Process_out final = new Article_Process_out { ArticleID = Article.ArticleID, Article = articlecopy, Correct = "tryagain, No plus or minus score", ArticleDisp = result, ErrorRemain = error_remain, AlreadyCorrect = already, Score = _repository.GetUserScore(username), hint = "", ScoreChange = 0 };
                    return Ok(final);
                }
                if (Regex.Matches(already.ToUpper(), Article.Input.ToUpper()).Count >= 1 && Article.Enter == 1) //Already Input, No plus or minus score
                {
                    int error_remain = wronglist.Count();
                    if (already != "")
                    {
                        error_remain = wronglist.Count() - already.Split(',').Count() / 2;
                    }
                    wrong = 0;
                    string result = rgx.Replace(Article.Article, replacement);
                    Article_Process_out final = new Article_Process_out { ArticleID = Article.ArticleID, Article = articlecopy, Correct = "Already Input, No plus or minus score", ArticleDisp = result, ErrorRemain = error_remain, AlreadyCorrect = already, Score = _repository.GetUserScore(username), hint = "", ScoreChange = 0 };
                    return Ok(final);
                }
                else if (correctlist[i].ToUpper() == Article.Input.ToUpper() && Article.Enter == 1) //add score
                {
                    Regex rgx12 = new Regex(wronglist[i]);
                    string correctreplacement = "<span style=\"color: green;\">" + correctlist[i] + "</span>";
                    string result = rgx12.Replace(Article.Article, correctreplacement);
                    string correctreplacementnocolor = correctlist[i];
                    string articleout = rgx12.Replace(articlecopy, correctreplacementnocolor);
                    if (already == "")
                    {
                        already += wronglist[i] + "," + correctlist[i];
                    }
                    else
                    {
                        already += "," + wronglist[i] + "," + correctlist[i];
                    }
                    int error_remain = wronglist.Count() - already.Split(',').Count() / 2;
                    wrong = 0;
                    Article_Process_out final = new Article_Process_out { ArticleID = Article.ArticleID, Article = articleout, Correct = "yes,add score", ArticleDisp = result, ErrorRemain = error_remain, AlreadyCorrect = already, Score = _repository.AddUserScore(username, articlediff), hint = "", ScoreChange = articlediff };
                    return Ok(final);
                }

            }
            int error_remain1 = wronglist.Count();
            if (already != "")
            {
                error_remain1 = wronglist.Count() - already.Split(',').Count() / 2;
            }
            Regex rgx2 = new Regex("(?i:" + Article.Input + ")+");
            string result2 = rgx2.Replace(Article.Article, "<span style=\"color: blue;\">$&</span>"); //完全匹配 字体蓝色高亮

            string temp12 = "(?<=[ ,.\'\"”“:;])" + Article.Input + "[a-zA-Z]{0,8}(?=[ ,.\'\"”“:;])";
            for (int i = 1; i < Article.Input.Length; i++) //生成可能拼错的单词
            {
                temp12 += "|(?<=[ ,.\'\"”“:;])" + Article.Input.Substring(0, i) + "[a-zA-Z]{0,8}" + Article.Input.Substring(i + 1) + "(?=[ ,.\'\"”“:;])";
            }
            Regex match8 = new Regex(temp12, RegexOptions.IgnoreCase); //Match
            Match match6 = match8.Match(result2, 0);
            while (match6.Success)
            {
                Regex regex8 = new Regex("<span style=\"color: blue;\">(" + Article.Input + ")+</span>", RegexOptions.IgnoreCase);
                Match match20 = regex8.Match(result2, 0);
                int repeat = 0;
                while (match20.Success)
                {
                    //Console.WriteLine(match20.Index + match20.Length);
                    if (match6.Index > match20.Index && match6.Index + match6.Length < match20.Index + match20.Length)
                    {
                        repeat = 1;
                        break;
                    }
                    else
                    {
                        match20 = regex8.Match(result2, match20.Index + match20.Length);
                        //Console.WriteLine(34343434344);
                    }
                }
                if (repeat == 0) //避免匹配到已经变成蓝色的单词
                {
                    result2 = result2.Substring(0, match6.Index) + "<span style=\"color: #e25555;\">" + match6.Value + "</span>" + result2.Substring(match6.Index + match6.Length); //模糊匹配 字体橙色高亮
                    match6 = match8.Match(result2, match6.Index + 37); //跳过该单词
                    Console.WriteLine(result2);
                }
                else
                {
                    match6 = match8.Match(result2, Math.Max(match20.Index + match20.Length, match6.Index));//跳过该单词
                }
            }


            Regex match9 = new Regex("(?<=[ ,.\'\"”“:;])[" + Article.Input + "]{" + Article.Input.Length + "}(?=[ ,.\'\"”“:;])", RegexOptions.IgnoreCase); //Match
            Match match10 = match9.Match(result2, 0);
            while (match10.Success)
            {
                Regex regex8 = new Regex("[A-Za-z]*<span style=\"color: blue;\">(?i:" + Article.Input + ")+</span>[A-Za-z]*", RegexOptions.IgnoreCase);
                Match match20 = regex8.Match(result2, 0);
                int repeat = 0;
                while (match20.Success)
                {
                    if (match6.Index > match20.Index && match6.Index + match6.Length < match20.Index + match20.Length)
                    {
                        repeat = 1;
                        break;
                    }
                    else
                    {
                        match20 = regex8.Match(result2, match20.Index + match20.Length);
                    }
                }
                if (repeat == 0) //避免匹配到已经变成蓝色的单词
                {
                    result2 = result2.Substring(0, match10.Index) + "<span style=\"color: #e25555;\">" + match10.Value + "</span>" + result2.Substring(match10.Index + match10.Length); //模糊匹配 字体橙色高亮
                    match10 = match9.Match(result2, match10.Index + 37); //跳过该单词
                }
                else
                {
                    match10 = match9.Match(result2, Math.Max(match20.Index + match20.Length, match10.Index));//跳过该单词
                }
            }

            Regex rgx3 = new Regex("[A-Za-z]*<span style=\"color: blue;\">(?i:" + Article.Input + ")+</span>[A-Za-z]*"); //蓝色的字添加灰色底
            string result3 = rgx3.Replace(result2, "<span style=\"background-color: DarkGray;\">$&</span>");
            Article_Process_out final1 = new Article_Process_out { ArticleID = Article.ArticleID, Article = articlecopy, Correct = "No, No plus or minus score", ArticleDisp = result3, ErrorRemain = error_remain1, AlreadyCorrect = already, Score = _repository.GetUserScore(username), hint = "", ScoreChange = 0 };


            if (wrong == 1 && Article.Enter == 1 && Article.hint == 0) //输错并回车 扣分
            {
                return Ok(new Article_Process_out { ArticleID = Article.ArticleID, Article = articlecopy, Correct = "No, minus score", ArticleDisp = result3, ErrorRemain = error_remain1, AlreadyCorrect = already, Score = _repository.MinusUserScore(username, articlediff), hint = "", ScoreChange = -1 * articlediff });
            }
            if (Article.hint == 1) //hint
            {
                for (int i = 0; i < correctlist.Count(); i++)
                {
                    if (Regex.Matches(already.ToUpper(), correctlist[i].ToUpper()).Count == 0)
                    {
                        Regex rgx4 = new Regex("(?i:" + wronglist[i] + ")+");
                        string result4 = rgx4.Replace(Article.Article, "<span style=\"color: blue;\">$&</span>");
                        return Ok(new Article_Process_out { ArticleID = Article.ArticleID, Article = articlecopy, Correct = "Hint", ArticleDisp = result4, ErrorRemain = error_remain1, AlreadyCorrect = already, Score = _repository.MinusUserScore(username, 1), hint = wronglist[i], ScoreChange = -1 });
                    }
                }
            }
            return Ok(final1);
        }

    }
}

