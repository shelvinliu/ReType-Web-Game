using ReType.Model;

namespace ReType.data
{
    public interface IWebAPIRepo
    {
        void SaveChanges(); //Save change to database
        bool ValidLogin(string userName, string password); //Vaild username and password from database and user input
        void Register(User user);// Add new user to database
        User Getuser(string Username);//Find username exist in database or not
        bool Send(string to, string subject, string body);//Send email to user
        void Storeverificationcode(Verificationcode code); //Store verification code
        Verificationcode Getverificationcode(string email, string code);//Vaild verification code
        void Deleteverificationcode(Verificationcode code);//Find verification code exist in database or not
        Verificationcode findemail(string email);//Vaild email in database or not
        User Getuserbyemail(string Email);//Get user by user email
        void UpdateUserDetail(User user); //Update User detail
        void UpdateEmail(User user);//Update user email
        bool ValidLoginbyemail(string Email, string password);//Vaild email and password from database and user input
        bool preventsqlinjection(string str); //Prevent users from using SQL commands to compromise database security
        Task<bool> VaildGoogleTokenAsync(string token, string email);
        Article ChooseArticle(string diff, string type);
        IEnumerable<User> GetAllUser();
        string[] CorrectWordList(int ArticleID);
        string[] WrongWordList(int ArticleID);
        int GetUserScore(string id);
        int AddUserScore(string id, int score);
        int MinusUserScore(string id, int score);
        int articlediff(int id);
    }
}
