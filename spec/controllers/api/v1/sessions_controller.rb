require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :controller do

  before do
    user = User.new(id: 1, nickname: 'kuzugr', email: 'kuzugr.mail', encrypted_password: 'test', sign_in_count: 0, created_at: '2019-03-26 00:00:00', updated_at: '2019-03-26 00:00:00')
    allow(controller).to receive(:authenticate_user_from_token!).and_return true
    allow(controller).to receive(:current_user).and_return(user)
  end


  describe "GET #login_state" do
    context 'login true' do
      before { get :login_state, params: { login_email: 'kuzugr.mail' } }

      it 'return an error response' do
        expect(JSON.parse(response.code)).to eq 200
        expect(JSON.parse(response.body)['login_state']).to eq true
      end
    end
  end
end
