#include<bits/stdc++.h>
using namespace std;

vector<string>v;

void subset(string &a,string &b,int i,int j,int n){
    if(i>=n){
        b[j]='\0';
        v.push_back(b);
        return;
    }
    else{
        subset(a,b,i+1,j,n);
        b[j]=a[i];
        subset(a,b,i+1,j+1,n);
        b[j]='\0';
        return;
    }
}

int main(){
    string a;
    cin>>a;
    int n=(int)a.size();
    string b;
    for(int i=0; i<n; i++)b.push_back('\0');
    subset(a,b,0,0,n);
    for(string s:v)cout<<s<<",";

}