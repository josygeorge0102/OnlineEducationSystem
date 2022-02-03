curl -k -XPOST "https://localhost:5001/connect/token" -H "Content-Type: application/x-www-form-urlencoded" -H "Cache-Control: no-cache" -d "client_id=m2m.client&scope=ClassroomServiceAPI.student&client_secret=511536EF-F270-4058-80CA-1C89C192F69A&grant_type=client_credentials"

curl -k -XGet -H "Authorization: Bearer
eyJhbGciOiJSUzI1NiIsImtpZCI6IjM4M0IyQjNDM0EwQkYzQTJFQzJGRUJBNTZENTUzNDAxIiwidHlwIjoiYXQrand0In0.eyJuYmYiOjE2NDE4ODcwMTQsImV4cCI6MTY0MTg5MDYxNCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6WyJDbGFzc3Jvb21TZXJ2aWNlQVBJIiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMS9yZXNvdXJjZXMiXSwiY2xpZW50X2lkIjoibTJtLmNsaWVudCIsImp0aSI6IkRGMjRBOTJGQzAwRjQ3MDg4NkY1MjFFQzVCMTkwNDk4IiwiaWF0IjoxNjQxODg3MDE0LCJzY29wZSI6WyJDbGFzc3Jvb21TZXJ2aWNlQVBJLnN0dWRlbnQiXX0.fVcMAb56eQovdSj6kt-SUZemZ4DRMFVCJrGCHK85ULVH2dcXwlfIFQ81-TBCKBFVVXg0MXGjFSjNj2DHcw_VtsV_DSu_XRN_Jgjw1y8Gj-wD-oYgsE4u1qnPjV4qSyIg_P390MdQD2ZiNGJ-MBUMrIdSjGd62KekUoPzR2TnRaIDdtkRL5t0TEP7RyRabi69bSy8uvQH24M9aVd1gt-M6JGlUb-PqL74fH-bXgkyCYSqyqXXI7VLqd8fcRLq-ihN7yhuuMRVGTMqSeXV73RiF0GYwsCVNbpt4xjoycIxeJLpIMSRMG1u9gPfup48pwHH2g5QdSDWGalseBXWXmjKBw" -H "Cache-Control: no-cache" "https://localhost:7189/api/classrooms"

dotnet ef migrations add Initial -c ApplicationDbContext
dotnet ef migrations add Initial -c ConfigurationDbcontext
dotnet ef migrations add Initial -c PersistedGrantDbContext

//made some columns not null in Initial of ApplicationDbContext

dotnet ef database update -c ApplicationDbContext
dotnet ef database update -c ConfigurationDbcontext
dotnet ef database update -c PersistedGrantDbContext

//just click on update for the sql for AspNetUsers 
//add null inst

.\bin\Debug\net6.0\LoginServiceAPI.exe /seed

And now you have setup your db with valid clients (web and apis) and with valid users (end users)

Made with Love by TEAM5

sql Identity column:
see: https://stackoverflow.com/questions/46671570/error-cs1061identitybuilder-does-not-contain-a-definition-for-addentityframe/66301124



