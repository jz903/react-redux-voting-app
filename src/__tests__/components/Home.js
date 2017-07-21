import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import Home from '../../components/Home'

const setup = (user = {}) => {
  const component = <Home user={user} />
  const wrapper = shallow(component)

  return {
    component,
    wrapper,
  }
}

describe('Home component', () => {
  it('should render without errors', () => {
    const { wrapper } = setup()

    expect(wrapper).toBeTruthy()
  })

  it('should render correct things', () => {
    const { wrapper } = setup()

    expect(wrapper.find('.App').length === 1).toBe(true)
  })

  it("should render right thing and don't change unexpected", () => {
    const { component } = setup()
    const tree = renderer.create(component).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
