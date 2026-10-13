import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GOLD = '#E8B84F';
const BG = '#080808';
const PANEL = '#151515';

function Button({ title, onPress, secondary = false }) {
  return <TouchableOpacity onPress={onPress} style={{ backgroundColor: secondary ? '#222' : GOLD, padding: 15, borderRadius: 13, alignItems: 'center', borderWidth: secondary ? 1 : 0, borderColor: '#444', marginTop: 12 }}><Text style={{ color: secondary ? GOLD : '#111', fontWeight: '800', fontSize: 15 }}>{title}</Text></TouchableOpacity>;
}
function Field({ placeholder, value, onChangeText, secureTextEntry, keyboardType }) {
  return <TextInput placeholder={placeholder} placeholderTextColor="#777" value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} keyboardType={keyboardType} autoCapitalize="none" style={{ backgroundColor: '#1C1C1C', borderWidth: 1, borderColor: '#333', color: '#FFF', padding: 14, borderRadius: 11, marginTop: 10 }} />;
}
function Card({ children, style }) { return <View style={[{ backgroundColor: PANEL, borderColor: '#34302A', borderWidth: 1, borderRadius: 18, padding: 17, marginBottom: 14 }, style]}>{children}</View>; }
function Label({ children }) { return <Text style={{ color: '#999', fontSize: 12, marginBottom: 5 }}>{children}</Text>; }

export default function App() {
  const [page, setPage] = useState('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('25');
  const [recipient, setRecipient] = useState('');
  const [balance, setBalance] = useState(1250.00);
  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState([{title:'Welcome to FLORIAK', detail:'Demo account created', amount:'+ $1,250.00', positive:true}]);
  const [tab, setTab] = useState('Home');

  const money = n => '$' + Number(n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
  const register = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || password.length < 6) return Alert.alert('Complete your details', 'Enter your name, email, phone number, and a password with at least 6 characters.');
    setPage('home');
  };
  const send = () => {
    const n = Number(amount);
    if (!recipient.trim()) return Alert.alert('Recipient required', 'Enter a recipient identifier.');
    if (!Number.isFinite(n) || n <= 0) return Alert.alert('Invalid amount', 'Enter an amount greater than zero.');
    if (n > balance) return Alert.alert('Insufficient demo balance', 'This demo wallet does not have enough funds.');
    setBalance(b => b - n);
    setTransactions(t => [{title:'Demo transfer', detail:'To ' + recipient, amount:'- ' + money(n), positive:false}, ...t]);
    setPage('home'); setTab('Home');
    Alert.alert('Demo transfer recorded', 'This is a demonstration only. No real money was moved.');
  };

  const header = <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}><View style={{flexDirection:'row',alignItems:'center'}}><View style={{width:38,height:38,borderRadius:12,backgroundColor:GOLD,alignItems:'center',justifyContent:'center',marginRight:10}}><Text style={{fontSize:23,fontWeight:'900',color:'#111'}}>F</Text></View><View><Text style={{color:'#FFF',fontWeight:'900',letterSpacing:3,fontSize:19}}>FLORIAK</Text><Text style={{color:GOLD,fontSize:9,letterSpacing:1.4}}>BANKING BEYOND BORDERS</Text></View></View><TouchableOpacity onPress={()=>Alert.alert('Notifications','You are all caught up in this demo.')}><Ionicons name="notifications-outline" size={23} color={GOLD}/></TouchableOpacity></View>;

  const home = () => <>
    {header}
    <Text style={{color:'#AAA',fontSize:14}}>Good to see you,</Text><Text style={{color:'#FFF',fontSize:25,fontWeight:'800',marginBottom:18}}>{name || 'Welcome'}</Text>
    <Card style={{backgroundColor:'#17140D', borderColor:'#7D6028'}}><View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><Label>DEMO WALLET BALANCE</Label><TouchableOpacity onPress={()=>setShowBalance(!showBalance)}><Ionicons name={showBalance?'eye-outline':'eye-off-outline'} size={20} color={GOLD}/></TouchableOpacity></View><Text style={{color:'#FFF',fontSize:32,fontWeight:'800',marginTop:8}}>{showBalance ? money(balance) : '••••••••'}</Text><Text style={{color:'#BCA36A',marginTop:8,fontSize:12}}>USD · Demo funds only</Text></Card>
    <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>{[{icon:'arrow-up',label:'Send',action:()=>setPage('send')},{icon:'arrow-down',label:'Receive',action:()=>setPage('receive')},{icon:'card-outline',label:'Cards',action:()=>setPage('cards')},{icon:'globe-outline',label:'Currency',action:()=>setPage('currency')}].map(x=><TouchableOpacity key={x.label} onPress={x.action} style={{alignItems:'center',width:'23%'}}><View style={{width:53,height:53,borderRadius:18,backgroundColor:'#2A2418',alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#5C4822'}}><Ionicons name={x.icon} size={22} color={GOLD}/></View><Text style={{color:'#DDD',fontSize:12,marginTop:7}}>{x.label}</Text></TouchableOpacity>)}</View>
    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><Text style={{color:'#FFF',fontSize:18,fontWeight:'700'}}>Recent activity</Text><TouchableOpacity onPress={()=>setPage('history')}><Text style={{color:GOLD,fontSize:12}}>See all</Text></TouchableOpacity></View>
    <Card>{transactions.slice(0,4).map((t,i)=><View key={i} style={{flexDirection:'row',alignItems:'center',paddingVertical:10,borderBottomWidth:i===Math.min(transactions.length,4)-1?0:1,borderColor:'#2B2B2B'}}><View style={{width:38,height:38,borderRadius:13,backgroundColor:'#28241A',alignItems:'center',justifyContent:'center',marginRight:11}}><Ionicons name={t.positive?'arrow-down':'arrow-up'} size={18} color={t.positive?'#67D5A2':GOLD}/></View><View style={{flex:1}}><Text style={{color:'#FFF',fontWeight:'600'}}>{t.title}</Text><Text style={{color:'#888',fontSize:12,marginTop:3}}>{t.detail}</Text></View><Text style={{color:t.positive?'#67D5A2':'#FFF',fontWeight:'700'}}>{t.amount}</Text></View>)}</Card>
    <Text style={{color:'#777',fontSize:11,textAlign:'center',marginTop:5}}>Prototype only · Not a real bank account</Text>
  </>;

  const content = () => {
    if(page==='welcome') return <View style={{flex:1,justifyContent:'center'}}><View style={{alignItems:'center',marginBottom:36}}><View style={{width:94,height:94,borderRadius:28,backgroundColor:GOLD,alignItems:'center',justifyContent:'center',marginBottom:20}}><Text style={{fontSize:62,fontWeight:'900',color:'#111'}}>F</Text></View><Text style={{color:'#FFF',fontSize:34,fontWeight:'900',letterSpacing:6}}>FLORIAK</Text><Text style={{color:GOLD,fontSize:11,letterSpacing:3,marginTop:8}}>BANKING BEYOND BORDERS</Text><Text style={{color:'#AAA',fontSize:15,textAlign:'center',marginTop:25,lineHeight:23}}>Your money. Your freedom.\nA smarter way to manage your finances.</Text></View><Button title="Create an account" onPress={()=>setPage('register')}/><Button title="Log in to demo" secondary onPress={()=>setPage('login')}/><Text style={{color:'#666',fontSize:11,textAlign:'center',marginTop:25}}>A prototype. No real funds or bank transfers.</Text></View>;
    if(page==='register') return <><Text style={title}>Create your account</Text><Text style={sub}>Start your FLORIAK demo wallet</Text><Field placeholder="Full name" value={name} onChangeText={setName}/><Field placeholder="Email address" value={email} onChangeText={setEmail} keyboardType="email-address"/><Field placeholder="Phone number" value={phone} onChangeText={setPhone} keyboardType="phone-pad"/><Field placeholder="Password (at least 6 characters)" value={password} onChangeText={setPassword} secureTextEntry/><Button title="Create demo account" onPress={register}/><Button title="Back" secondary onPress={()=>setPage('welcome')}/></>;
    if(page==='login') return <><Text style={title}>Welcome back</Text><Text style={sub}>Use any details to enter this local demo.</Text><Field placeholder="Email or phone number" value={email} onChangeText={setEmail}/><Field placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/><Button title="Enter demo" onPress={()=>{setName(name||'FLORIAK User');setPage('home')}}/><Button title="Create account" secondary onPress={()=>setPage('register')}/></>;
    if(page==='home') return home();
    if(page==='send') return <><Text style={title}>Send money</Text><Text style={sub}>Record a simulated transfer</Text><Card><Label>Available demo balance</Label><Text style={{color:'#FFF',fontSize:23,fontWeight:'800'}}>{money(balance)}</Text></Card><Label>Recipient email or phone</Label><Field placeholder="Enter recipient" value={recipient} onChangeText={setRecipient}/><Label style={{marginTop:15}}>Amount (USD)</Label><Field placeholder="0.00" value={amount} onChangeText={setAmount} keyboardType="decimal-pad"/><Button title="Confirm demo transfer" onPress={send}/><Button title="Cancel" secondary onPress={()=>setPage('home')}/><Text style={{color:'#777',fontSize:11,marginTop:15}}>This does not send money to another person.</Text></>;
    if(page==='receive') return <><Text style={title}>Receive money</Text><Text style={sub}>Your demo account details</Text><Card><Label>Account holder</Label><Text style={body}>{name||'FLORIAK User'}</Text><Label>Demo wallet ID</Label><Text selectable style={[body,{color:GOLD}]}>FLK-DEMO-2048</Text><Label>Registered email</Label><Text selectable style={body}>{email||'Not set'}</Text></Card><Text style={{color:'#AAA',lineHeight:22}}>These are sample details for testing only. They cannot receive real payments.</Text><Button title="Back to home" onPress={()=>setPage('home')}/></>;
    if(page==='cards') return <><Text style={title}>Cards</Text><Text style={sub}>Preview of a future card feature</Text><View style={{backgroundColor:'#17130B',borderColor:'#B88A31',borderWidth:1,borderRadius:22,padding:22,height:190,justifyContent:'space-between',marginBottom:18}}><View style={{flexDirection:'row',justifyContent:'space-between'}}><Text style={{color:GOLD,fontWeight:'900',letterSpacing:3}}>FLORIAK</Text><Ionicons name="wifi" size={24} color={GOLD}/></View><Ionicons name="card-outline" size={33} color={GOLD}/><View><Text style={{color:'#EEE',fontSize:18,letterSpacing:3}}>••••  ••••  ••••  2048</Text><Text style={{color:'#AAA',marginTop:8,fontSize:11}}>DEMO CARD · NOT FOR PAYMENTS</Text></View></View><Button title="Request a real card (not available)" secondary onPress={()=>Alert.alert('Not available','Real cards require a supported, licensed card provider.')}/><Button title="Back to home" onPress={()=>setPage('home')}/></>;
    if(page==='currency') return <><Text style={title}>Currencies</Text><Text style={sub}>Illustrative balances — not live exchange rates</Text>{[{c:'USD',n:'US Dollar',v:balance},{c:'EUR',n:'Euro',v:0},{c:'GBP',n:'British Pound',v:0},{c:'NGN',n:'Nigerian Naira',v:0}].map(x=><Card key={x.c} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}><View><Text style={{color:'#FFF',fontSize:17,fontWeight:'700'}}>{x.c}</Text><Text style={{color:'#888',marginTop:4}}>{x.n}</Text></View><Text style={{color:GOLD,fontWeight:'800'}}>{money(x.v)}</Text></Card>)}<Button title="Back to home" onPress={()=>setPage('home')}/></>;
    if(page==='history') return <><Text style={title}>Transaction history</Text><Text style={sub}>Activity recorded in this demo</Text><Card>{transactions.map((t,i)=><View key={i} style={{paddingVertical:13,borderBottomWidth:i===transactions.length-1?0:1,borderColor:'#333'}}><Text style={{color:'#FFF',fontWeight:'700'}}>{t.title}</Text><Text style={{color:'#888',marginTop:4}}>{t.detail}</Text><Text style={{color:t.positive?'#67D5A2':GOLD,marginTop:6,fontWeight:'700'}}>{t.amount}</Text></View>)}</Card><Button title="Back to home" onPress={()=>setPage('home')}/></>;
    return <><Text style={title}>Settings</Text><Text style={sub}>Demo profile and app information</Text><Card><Label>Account name</Label><Text style={body}>{name||'FLORIAK User'}</Text><View style={{height:15}}/><Label>Email address</Label><Text style={body}>{email||'Not set'}</Text><View style={{height:15}}/><Label>Security</Label><Text style={body}>Never use real passwords or bank details in this prototype.</Text></Card><Button title="Log out" onPress={()=>{setPage('welcome');setTab('Home')}}/><Button title="Back to home" secondary onPress={()=>setPage('home')}/></>;
  };
  const title={color:'#FFF',fontSize:27,fontWeight:'800',marginBottom:7};
  const sub={color:'#999',fontSize:14,marginBottom:20};
  const body={color:'#EEE',fontSize:15};
  const navItems=[{name:'Home',icon:'home-outline',page:'home'},{name:'History',icon:'time-outline',page:'history'},{name:'Cards',icon:'card-outline',page:'cards'},{name:'Settings',icon:'settings-outline',page:'settings'}];

  return <SafeAreaView style={{flex:1,backgroundColor:BG}}><StatusBar barStyle="light-content" backgroundColor={BG}/><ScrollView contentContainerStyle={{paddingHorizontal:22,paddingTop:22,paddingBottom:25,flexGrow:1}} keyboardShouldPersistTaps="handled">{content()}</ScrollView>{page==='home' && <View style={{flexDirection:'row',backgroundColor:'#111',borderTopWidth:1,borderColor:'#292929',paddingTop:11,paddingBottom:9,justifyContent:'space-around'}}>{navItems.map(x=><TouchableOpacity key={x.name} onPress={()=>{setTab(x.name);setPage(x.page)}} style={{alignItems:'center',minWidth:60}}><Ionicons name={x.icon} size={21} color={tab===x.name?GOLD:'#777'}/><Text style={{fontSize:10,marginTop:4,color:tab===x.name?GOLD:'#777'}}>{x.name}</Text></TouchableOpacity>)}</View>}</SafeAreaView>;
}
