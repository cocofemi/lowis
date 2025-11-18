export interface User {
    id:string;
    fname:string;
    lname:string;
    email:string;
    bio:string;
    occupation:string;
    serviceType:string;
    emailVerified:boolean;
    businesses: Organisation[]
}

export interface Organisation {
    name:string;
    phone:string;
    address:string;
    serviceType:string;
    ownerId: User
    logo:string;
    subscriptionPlan:string
    subscriptionStatus:string
}

export interface Invitations {
    id:string;
    email:string;
    business: Organisation;
    role:string;
    token:string;
    status:string;
    invitedBy: User;
    expiresAt:string;
    createdAt:string;
}

export interface RegisterResponse {
  register: {
    token: string;
    user: {
      fname: string;
      lname: string;
      email: string;
      emailVerified: boolean;
      businesses: [
        {
          business: {
            id: string;
            name: string;
          };

          role: string;
        },
      ];
    };
  };
}

export interface GenerateOtpResponse {
  generateOtp: {
    email: string;
    otp: string;
  };
}

export interface GenerateOtpVariables {
  email: string;
  type: string;
}

export interface OrganisationInviteResponse {
  inviteBusinessMember: {
    id: string;
    email: string;
    business: Organisation;
    role: string;
    token: string;
    invitedBy: User;
    expiresAt: string;
  };
}


export interface GenerateLoginResponnse {
  login: {
    token: string;
    user: {
      fname: string;
      lname: string;
      email: string;
      emailVerified: boolean;
      businesses: [
        {
          business: {
            id: string;
            name: string;
          };

          role: string;
        },
      ];
    };
  };
}

