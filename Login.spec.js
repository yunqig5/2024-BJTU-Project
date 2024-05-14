import { mount } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import { SET_TOKEN, SET_UNAME } from '@/store/modules/app/type';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import store from '@/store';
import router from '@/router';

// Mock axios
jest.mock('axios');

// Mock ElMessage
ElMessage.error = jest.fn();

// Mock store and router
const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
};
const mockRouter = {
  push: jest.fn(),
};

describe('Login.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [store, router],
        stubs: {
          Common: true,
        },
        mocks: {
          $store: mockStore,
          $router: mockRouter,
        },
      },
    });
  });

  it('validates the form', async () => {
    // Fill in the form with invalid data
    wrapper.vm.form.userName = '';
    wrapper.vm.form.pwd = '';

    // Trigger form validation
    await wrapper.vm.onSubmit();

    // Check that ElMessage.error was called with the correct message
    expect(ElMessage.error).toHaveBeenCalledWith('Please type your username');
  });

  it('submits the form and logs in', async () => {
    // Mock the axios response
    axios.post.mockResolvedValueOnce({ data: 0 });

    // Fill in the form with valid data
    wrapper.vm.form.userName = 'Tom';
    wrapper.vm.form.pwd = '123';

    // Trigger form submission
    await wrapper.vm.onSubmit();

    // Check that the store and router were called correctly
    expect(mockStore.dispatch).toHaveBeenCalledWith(`app/${SET_UNAME}`, 'Tom');
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'AppMain' });
  });

  // Add more tests for other scenarios, such as error cases and edge cases
});
