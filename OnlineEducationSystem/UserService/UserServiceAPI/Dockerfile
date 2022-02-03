FROM mcr.microsoft.com/dotnet/sdk:6.0.101-bullseye-slim-amd64 AS build
WORKDIR /app
#EXPOSE PORT 80 and 443 ????
# ENV "Server=loginservicedb,1433;Database=LoginServiceDB;User ID=SA;Password=Pa55word!;MultipleActiveResultSets=true;"s__ClassroomServiceDB "Server=classroomservicedb,1434;Database=ClassroomServiceDB;User Id=sa;Password=Pa55word!;MultipleActiveResultSets=true"

# Copy csproj and add as distinct layers
COPY ["OnlineEducationSystem/UserService/UserServiceAPI/UserServiceAPI.csproj", "./"]
RUN dotnet restore "UserServiceAPI.csproj" --disable-parallel

# Copy everything else (except stuf  in .dockerignore) and build
COPY OnlineEducationSystem/UserService/UserServiceAPI/ .
# RUN dotnet tool install --global dotnet-ef
# ENV PATH $PATH:/root/.dotnet/tools
# RUN dotnet ef database update
RUN dotnet publish "UserServiceAPI.csproj" -c Release -o /app/publish 

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0.1-bullseye-slim-amd64 AS base
WORKDIR /app
COPY --from=build /app/publish ./
ENTRYPOINT ["dotnet", "UserServiceAPI.dll"]
