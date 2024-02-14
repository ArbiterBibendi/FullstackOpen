import React from 'react';
import 'jest-environment-jsdom';
import { screen, render } from '@testing-library/react';
import Blog from './Blog';

describe('correct details are shown', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 5
    };
    render(<Blog blog={blog} />);
    test('blog renders only title and author by default', () => {
        const blog = screen.queryByText('test title');
        console.log(blog);
    });
});

