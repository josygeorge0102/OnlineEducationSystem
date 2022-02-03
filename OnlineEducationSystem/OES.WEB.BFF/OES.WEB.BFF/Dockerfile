FROM mcr.microsoft.com/dotnet/sdk:6.0.101-bullseye-slim-amd64 AS build
WORKDIR /app
#EXPOSE PORT 80 and 443 ????
# ENV ConnectionStrings__ClassroomServiceDB "Server=classroomservicedb,1433;Database=ClassroomServiceDB;User Id=sa;Password=Pa55word!;MultipleActiveResultSets=true"

# Prevent 'Warning: apt-key output should not be parsed (stdout is not a terminal)'
ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# install NodeJS 17.x
# see https://github.com/nodesource/distributions/blob/master/README.md#deb
RUN apt-get update -yq 
RUN apt-get install curl gnupg -yq 
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install -y nodejs
RUN apt install aptitude -yq
RUN aptitude install npm -yq

# Copy csproj and add as distinct layers
COPY ["OnlineEducationSystem/OES.WEB.BFF/OES.WEB.BFF/OES.WEB.BFF.csproj", "./"]
RUN dotnet restore "OES.WEB.BFF.csproj" --disable-parallel

# Copy everything else (except stuf  in .dockerignore) and build
COPY OnlineEducationSystem/OES.WEB.BFF/OES.WEB.BFF/ .
# RUN dotnet publish "OES.WEB.BFF.csproj" -c Release -o /app/publish 
RUN dotnet publish "OES.WEB.BFF.csproj" -c Release -o /app

# # Build runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:6.0.1-bullseye-slim-amd64 AS base
# WORKDIR /app

# # Prevent 'Warning: apt-key output should not be parsed (stdout is not a terminal)'
# ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1

# # install NodeJS 17.x
# # see https://github.com/nodesource/distributions/blob/master/README.md#deb
# RUN apt-get update -yq 
# RUN apt-get install curl gnupg -yq 
# RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
# RUN apt-get install -y nodejs
# RUN apt install aptitude -yq
# RUN aptitude install npm -yq

# COPY --from=build /app/publish ./
# ENTRYPOINT ["dotnet", "OES.WEB.BFF.dll"]

# WORKDIR /src
# RUN ls /app 
# COPY /app ./
ENTRYPOINT ["dotnet", "OES.WEB.BFF.dll"]
